import * as React from 'react';
import { useFetchClient, useField } from '@strapi/strapi/admin';
import type { PanelComponent } from '@strapi/content-manager/strapi-admin';

/**
 * Instagram-style frame picker in the edit-view side panel.
 * Shown only on the 3 video content-types. Reads the attached `video`
 * straight from the edit form (works before Save), captures a frame,
 * uploads it to the Media Library and writes it directly into the
 * posterImage / coverImage field — the admin only has to press Save.
 */

const COVER_FIELD_BY_MODEL: Record<string, string> = {
  'api::reel.reel': 'posterImage',
  'api::cinematic-story.cinematic-story': 'coverImage',
  'api::story-chapter.story-chapter': 'coverImage',
};

interface StrapiMediaFile {
  id: number;
  url: string;
  [key: string]: unknown;
}

function toAbsoluteUrl(url: string): string {
  if (/^https?:\/\//i.test(url)) return url;
  return `${window.location.origin}${url.startsWith('/') ? '' : '/'}${url}`;
}

function videoUrlFromValue(value: unknown): string | null {
  if (value && typeof value === 'object' && typeof (value as { url?: unknown }).url === 'string') {
    return toAbsoluteUrl((value as { url: string }).url);
  }
  return null;
}

function PickerContent({ coverFieldName }: { coverFieldName: string }) {
  const { post } = useFetchClient();
  // Live form values — works with unsaved video selections too.
  const videoField = useField<StrapiMediaFile | null>('video');
  const coverField = useField<StrapiMediaFile | null>(coverFieldName);

  const videoRef = React.useRef<HTMLVideoElement | null>(null);
  const [localSrc, setLocalSrc] = React.useState<string>('');
  const [duration, setDuration] = React.useState(0);
  const [currentTime, setCurrentTime] = React.useState(0);
  const [thumbs, setThumbs] = React.useState<Array<{ t: number; src: string }>>([]);
  const [busy, setBusy] = React.useState(false);
  const [coverPreviewUrl, setCoverPreviewUrl] = React.useState<string>('');
  const [coverSize, setCoverSize] = React.useState<string>('');
  const coverBlobRef = React.useRef<Blob | null>(null);
  const [message, setMessage] = React.useState<string>(
    'Attach a video in the video field, scrub to a frame, then capture it as cover.'
  );

  const attachedVideoUrl = videoUrlFromValue(videoField.value);
  const videoSrc = attachedVideoUrl ?? localSrc;

  React.useEffect(() => {
    return () => {
      if (localSrc.startsWith('blob:')) URL.revokeObjectURL(localSrc);
    };
  }, [localSrc]);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLocalSrc((prev) => {
      if (prev.startsWith('blob:')) URL.revokeObjectURL(prev);
      return URL.createObjectURL(file);
    });
    setThumbs([]);
    setMessage(`Loaded: ${file.name} — scrub and capture a frame.`);
  };

  const buildFilmstrip = (src: string, total: number) => {
    const N = 10;
    const tmp = window.document.createElement('video');
    tmp.muted = true;
    tmp.preload = 'auto';
    tmp.src = src;
    const out: Array<{ t: number; src: string }> = [];
    let i = 0;
    const step = () => {
      if (i >= N) {
        setThumbs(out);
        tmp.removeAttribute('src');
        return;
      }
      tmp.currentTime = (total / N) * (i + 0.5);
    };
    tmp.addEventListener('loadedmetadata', step);
    tmp.addEventListener('seeked', () => {
      try {
        const c = window.document.createElement('canvas');
        c.width = 96;
        c.height = 54;
        c.getContext('2d')?.drawImage(tmp, 0, 0, 96, 54);
        out.push({ t: tmp.currentTime, src: c.toDataURL('image/jpeg', 0.7) });
      } catch {
        /* ignore single-frame errors */
      }
      i += 1;
      step();
    });
  };

  const onLoadedMetadata = () => {
    const v = videoRef.current;
    if (!v || !v.videoWidth) return;
    const d = v.duration || 0;
    setDuration(d);
    if (d > 0) buildFilmstrip(v.currentSrc || videoSrc, d);
  };

  const seekTo = (t: number) => {
    const v = videoRef.current;
    if (!v || !duration) return;
    v.currentTime = Math.min(Math.max(0, t), duration);
  };

  // Live servers buffer slower: ensure the current frame is actually decoded.
  const waitForFrame = (vv: HTMLVideoElement): Promise<void> => {
    if (vv.readyState >= 2 && vv.videoWidth > 0) return Promise.resolve();
    return new Promise<void>((resolve, reject) => {
      const timer = window.setTimeout(() => reject(new Error('frame not loaded yet')), 10000);
      const done = () => {
        window.clearTimeout(timer);
        resolve();
      };
      vv.addEventListener('canplay', done, { once: true });
      vv.addEventListener('seeked', done, { once: true });
      vv.addEventListener('error', () => {
        window.clearTimeout(timer);
        reject(new Error('video failed to load'));
      }, { once: true });
    });
  };

  const errText = (e: unknown) => (e instanceof Error ? e.message : String(e));

  const capturePreview = async (atTime?: number) => {
    const v = videoRef.current;
    if (!v) {
      setMessage('Video not ready — let it load, then capture.');
      return;
    }
    const doCapture = async () => {
      const vv = videoRef.current;
      if (!vv) return;
      setBusy(true);
      setMessage('Reading video frame… (pausing first)');
      vv.pause();
      try {
        await waitForFrame(vv);
        const c = window.document.createElement('canvas');
        c.width = vv.videoWidth;
        c.height = vv.videoHeight;
        c.getContext('2d')?.drawImage(vv, 0, 0, c.width, c.height);
        const blob: Blob | null = await new Promise((resolve) => c.toBlob(resolve, 'image/jpeg', 0.92));
        if (!blob) {
          throw new Error('canvas is tainted (video CORS) — use "choose file" below instead');
        }
        if (coverPreviewUrl.startsWith('blob:')) URL.revokeObjectURL(coverPreviewUrl);
        coverBlobRef.current = blob;
        setCoverPreviewUrl(URL.createObjectURL(blob));
        setCoverSize(`${c.width}x${c.height}`);
        setMessage(`Frame captured (${c.width}x${c.height}) — preview below, then upload it as cover.`);
      } catch (e) {
        setMessage(`Capture failed: ${errText(e)}`);
      } finally {
        setBusy(false);
      }
    };
    if (typeof atTime === 'number') {
      v.currentTime = atTime;
      v.addEventListener('seeked', () => void doCapture(), { once: true });
    } else {
      await doCapture();
    }
  };

  const uploadAndApply = async () => {
    const blob = coverBlobRef.current;
    if (!blob) {
      setMessage('Capture a frame first.');
      return;
    }
    setBusy(true);
    setMessage('Uploading cover to Media Library…');
    try {
      const form = new FormData();
      form.append('files', blob, `cover-${Date.now()}.jpg`);
      const res = (await post('/upload', form)) as { data?: unknown };
      const uploaded = Array.isArray(res.data) ? res.data[0] : res.data;
      if (!uploaded || typeof uploaded !== 'object') {
        throw new Error('upload returned an unexpected response (check Media Library permissions)');
      }
      // Write straight into the cover field — admin only presses Save.
      coverField.onChange(coverFieldName, uploaded as StrapiMediaFile);
      setMessage(`Cover set in "${coverFieldName}" — press Save to finish.`);
    } catch (e) {
      setMessage(`Upload failed: ${errText(e)} — or use Download JPG and attach it manually.`);
    } finally {
      setBusy(false);
    }
  };

  const downloadCover = () => {
    if (!coverBlobRef.current) return;
    const a = window.document.createElement('a');
    a.href = coverPreviewUrl;
    a.download = `cover-${Date.now()}.jpg`;
    a.click();
    setMessage('Cover downloaded — attach it in the cover field via the media library.');
  };

  return (
    <div style={{ display: 'grid', gap: 10, fontSize: 13 }}>
      {videoSrc ? (
        <>
          <video
            key={videoSrc}
            ref={videoRef}
            src={videoSrc}
            controls
            playsInline
            muted
            crossOrigin="anonymous"
            style={{ width: '100%', borderRadius: 8, background: '#000' }}
            onLoadedMetadata={onLoadedMetadata}
            onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
            onSeeked={(e) => setCurrentTime(e.currentTarget.currentTime)}
          />
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center' }}>
            <button type="button" style={btnStyle} disabled={busy} onClick={() => seekTo(currentTime - 1)}>-1s</button>
            <button type="button" style={btnStyle} disabled={busy} onClick={() => seekTo(currentTime - 1 / 30)}>-1f</button>
            <button type="button" style={btnStyle} disabled={busy} onClick={() => seekTo(currentTime + 1 / 30)}>+1f</button>
            <button type="button" style={btnStyle} disabled={busy} onClick={() => seekTo(currentTime + 1)}>+1s</button>
            <span style={{ fontVariantNumeric: 'tabular-nums', color: '#666', fontSize: 12 }}>
              {currentTime.toFixed(2)}s / {duration.toFixed(2)}s
            </span>
          </div>
          <input
            type="range"
            min={0}
            max={duration || 0}
            step={0.01}
            value={Math.min(currentTime, duration || 0)}
            onChange={(e) => seekTo(parseFloat(e.target.value))}
            style={{ width: '100%' }}
          />
          {thumbs.length > 0 && (
            <div style={{ display: 'flex', gap: 4, overflowX: 'auto' }}>
              {thumbs.map((t) => (
                <img
                  key={t.t.toFixed(2)}
                  src={t.src}
                  alt={`${t.t.toFixed(1)}s`}
                  title={`${t.t.toFixed(2)}s — click to jump`}
                  onClick={() => seekTo(t.t)}
                  style={{
                    height: 40,
                    borderRadius: 4,
                    cursor: 'pointer',
                    border:
                      duration > 0 && Math.abs(t.t - currentTime) < duration / 20
                        ? '2px solid #4945ff'
                        : '2px solid transparent',
                  }}
                />
              ))}
            </div>
          )}
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            <button type="button" style={primaryBtnStyle} disabled={busy} onClick={() => void capturePreview()}>
              {busy ? 'Working…' : 'Capture this frame'}
            </button>
            <button
              type="button"
              style={btnStyle}
              disabled={busy}
              onClick={() => void capturePreview(Math.min(0.5, Math.max(0, duration - 0.05)))}
            >
              Auto: 0.5s
            </button>
          </div>
          {coverPreviewUrl && (
            <div style={{ display: 'grid', gap: 6 }}>
              <img
                src={coverPreviewUrl}
                alt="Captured cover preview"
                style={{ width: '100%', borderRadius: 8, background: '#000' }}
              />
              <span style={{ fontSize: 12, color: '#666' }}>Captured {coverSize} JPG</span>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                <button type="button" style={primaryBtnStyle} disabled={busy} onClick={() => void uploadAndApply()}>
                  Upload & set as cover
                </button>
                <button type="button" style={btnStyle} disabled={busy} onClick={downloadCover}>
                  Download JPG
                </button>
              </div>
            </div>
          )}
          <div style={{ fontSize: 12, color: '#666' }}>
            or scrub a different file: <input type="file" accept="video/*" onChange={onFileChange} style={{ width: '100%' }} />
          </div>
        </>
      ) : (
        <div style={{ display: 'grid', gap: 6 }}>
          <div style={{ fontSize: 12, color: '#666' }}>
            No video attached yet — add one in the <strong>video</strong> field, or pick a file here:
          </div>
          <input type="file" accept="video/*" onChange={onFileChange} style={{ width: '100%' }} />
        </div>
      )}

      <p style={{ margin: 0, color: '#666', fontSize: 12 }}>{message}</p>
    </div>
  );
}

const btnStyle: React.CSSProperties = {
  border: '1px solid #dcdce4',
  background: '#fff',
  borderRadius: 6,
  padding: '6px 10px',
  cursor: 'pointer',
  fontSize: 12,
};

const primaryBtnStyle: React.CSSProperties = {
  ...btnStyle,
  background: '#4945ff',
  borderColor: '#4945ff',
  color: '#fff',
  fontWeight: 600,
};

export const VideoCoverPanel: PanelComponent = ({ model }) => {
  const coverFieldName = COVER_FIELD_BY_MODEL[model];
  if (!coverFieldName) {
    return { title: 'Video cover', content: null };
  }
  return {
    title: 'Video cover picker',
    content: <PickerContent coverFieldName={coverFieldName} />,
  };
};
