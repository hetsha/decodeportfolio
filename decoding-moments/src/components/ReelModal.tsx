import React, { useState, useEffect, useRef } from 'react';
import { X, Play, Heart, Volume2, VolumeX, Instagram, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, useMotionValue, animate, type PanInfo } from 'motion/react';
import { ReelItem } from '../types';

interface ReelModalProps {
  reel: ReelItem | null;
  reels?: ReelItem[];
  onClose: () => void;
  onNext?: () => void;
  onPrev?: () => void;
  section?: Record<string, string>;
  instagramProfileUrl?: string;
}

const DEFAULT_INSTAGRAM_PROFILE = 'https://www.instagram.com/decoding.moments';
const SWIPE_OFFSET_PX = 80;
const SWIPE_VELOCITY = 400;
const TAP_MOVE_PX = 8;
const EASE: [number, number, number, number] = [0.4, 0, 0.2, 1];
const HINT_START_MS = 2500;

export const ReelModal: React.FC<ReelModalProps> = ({
  reel,
  reels,
  onClose,
  onNext,
  onPrev,
  section,
  instagramProfileUrl,
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [likeCount, setLikeCount] = useState(reel?.likes || 1200);
  const [hasLiked, setHasLiked] = useState(false);
  const [floatingHearts, setFloatingHearts] = useState<{ id: number; x: number }[]>([]);
  const [showInstruction, setShowInstruction] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const wasDraggedRef = useRef(false);
  const animatingRef = useRef(false);
  const hintControlsRef = useRef<ReturnType<typeof animate> | null>(null);
  const hintTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hintShownRef = useRef(false);
  const dragY = useMotionValue(0);
  const peekY = useMotionValue(0);

  const list = reels && reels.length > 0 ? reels : reel ? [reel] : [];
  const index = reel ? list.findIndex((r) => r.id === reel.id) : -1;
  const prevReel = list.length > 1 && index >= 0 ? list[(index - 1 + list.length) % list.length] : null;
  const nextReel = list.length > 1 && index >= 0 ? list[(index + 1) % list.length] : null;

  const stopHint = () => {
    if (hintTimerRef.current) {
      clearTimeout(hintTimerRef.current);
      hintTimerRef.current = null;
    }
    if (hintControlsRef.current) {
      hintControlsRef.current.stop();
      hintControlsRef.current = null;
    }
    setShowInstruction(false);
    animate(peekY, 0, { duration: 0.2, ease: EASE });
  };

  const startHintSequence = () => {
    if (hintShownRef.current) return;
    hintShownRef.current = true;
    stopHint();
    hintTimerRef.current = setTimeout(() => {
      if (animatingRef.current || !reel) return;
      setShowInstruction(true);
      hintControlsRef.current = animate(
        peekY,
        [0, -42, 0],
        {
          duration: 1.15,
          ease: 'easeInOut',
          repeat: 2,
          repeatDelay: 0.75,
        },
      );
    }, HINT_START_MS);
  };

  useEffect(() => {
    if (reel) {
      setLikeCount(reel.likes);
      setHasLiked(false);
      setProgress(0);
      setIsPlaying(true);
      dragY.set(0);
      peekY.set(0);
      animatingRef.current = false;
      startHintSequence();
    } else {
      hintShownRef.current = false;
      stopHint();
    }
    return () => {
      stopHint();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reel?.id, reels?.length]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (!isPlaying) {
      video.pause();
      return;
    }
    video.play().catch(() => {
      video.muted = true;
      setIsMuted(true);
      video.play().catch(() => {});
    });
  }, [isPlaying, reel?.id]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  useEffect(() => {
    if (!isPlaying || !reel || reel.video) return;
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 0;
        return prev + 1.2;
      });
    }, 100);
    return () => clearInterval(interval);
  }, [isPlaying, reel]);

  useEffect(() => {
    if (!reel?.video || !videoRef.current) return;
    const video = videoRef.current;
    const updateProgress = () => {
      if (video.duration) {
        setProgress((video.currentTime / video.duration) * 100);
      }
    };
    video.addEventListener('timeupdate', updateProgress);
    return () => video.removeEventListener('timeupdate', updateProgress);
  }, [reel?.video]);

  const goTo = (dir: 1 | -1) => {
    if (animatingRef.current) return;
    stopHint();
    const card = document.getElementById('reel-modal-card');
    const h = card?.offsetHeight || 600;
    const target = dir === 1 ? -h : h;
    animatingRef.current = true;
    animate(dragY, target, {
      duration: 0.3,
      ease: EASE,
      onComplete: () => {
        dragY.set(0);
        animatingRef.current = false;
        if (dir === 1) onNext?.();
        else onPrev?.();
      },
    });
  };

  useEffect(() => {
    if (!reel) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowRight') {
        e.preventDefault();
        goTo(1);
      } else if (e.key === 'ArrowDown' || e.key === 'ArrowLeft') {
        e.preventDefault();
        goTo(-1);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reel, onClose, onNext, onPrev]);

  useEffect(() => {
    if (!reel) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [reel]);

  const handleDragStart = () => {
    stopHint();
    wasDraggedRef.current = false;
  };

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    stopHint();
    const { offset, velocity } = info;
    wasDraggedRef.current =
      Math.abs(offset.y) > TAP_MOVE_PX ||
      Math.abs(offset.x) > TAP_MOVE_PX ||
      Math.abs(velocity.y) > 100 ||
      Math.abs(velocity.x) > 100;

    if (offset.y < -SWIPE_OFFSET_PX || velocity.y < -SWIPE_VELOCITY) {
      goTo(1);
    } else if (offset.y > SWIPE_OFFSET_PX || velocity.y > SWIPE_VELOCITY) {
      goTo(-1);
    } else {
      animate(dragY, 0, { type: 'spring', stiffness: 400, damping: 35 });
    }
  };

  const handleLike = () => {
    stopHint();
    if (wasDraggedRef.current) return;
    if (!hasLiked) {
      setLikeCount((prev) => prev + 1);
      setHasLiked(true);
      const newHeart = { id: Date.now(), x: Math.random() * 40 - 20 };
      setFloatingHearts((prev) => [...prev, newHeart]);
      setTimeout(() => {
        setFloatingHearts((prev) => prev.filter((h) => h.id !== newHeart.id));
      }, 1200);
    } else {
      setLikeCount((prev) => prev - 1);
      setHasLiked(false);
    }
  };

  if (!reel) return null;

  const instagramHref = reel.instagramUrl || instagramProfileUrl || DEFAULT_INSTAGRAM_PROFILE;

  const renderSlide = (slideReel: ReelItem | null, role: 'prev' | 'current' | 'next') => {
    if (!slideReel) {
      return <div className="absolute inset-0 bg-stone-950" />;
    }
    const isCurrent = role === 'current';
    const slideHref = slideReel.instagramUrl || instagramProfileUrl || DEFAULT_INSTAGRAM_PROFILE;

    return (
      <div className="absolute inset-0 overflow-hidden bg-stone-950">
        <div className="absolute inset-0 overflow-hidden">
          {isCurrent && slideReel.video ? (
            <video
              ref={videoRef}
              src={slideReel.video.url}
              poster={slideReel.posterUrl || undefined}
              className="w-full h-full object-cover"
              autoPlay
              muted={isMuted}
              loop
              playsInline
            />
          ) : (
            <motion.div
              animate={isCurrent && isPlaying ? { scale: [1, 1.08, 1] } : { scale: 1 }}
              transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url('${slideReel.posterUrl}')` }}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-black/60 pointer-events-none" />
        </div>

        <div className="relative z-20 p-3 sm:p-4 pt-4 sm:pt-5 flex flex-col space-y-2">
          <div className="w-full h-1 bg-white/25 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-[#E8D5B5]"
              style={{ width: `${isCurrent ? progress : 0}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-white pt-2">
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-bold tracking-widest uppercase bg-black/50 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/20 text-[#E8D5B5]">
                {slideReel.badge}
              </span>
              <span className="text-xs text-stone-300 font-medium">
                {slideReel.category}
              </span>
            </div>

            <div className="flex items-center space-x-2">
              {isCurrent && (
                <>
                  <button
                    onClick={() => {
                      if (wasDraggedRef.current) return;
                      stopHint();
                      setIsMuted(!isMuted);
                    }}
                    className="p-1.5 rounded-full bg-black/40 hover:bg-black/60 text-white transition-colors"
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={() => {
                      if (wasDraggedRef.current) return;
                      onClose();
                    }}
                    className="p-1.5 rounded-full bg-black/40 hover:bg-black/60 text-white transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {isCurrent && (
          <div
            onClick={() => {
              if (wasDraggedRef.current) return;
              stopHint();
              setIsPlaying(!isPlaying);
            }}
            className="absolute inset-0 z-10 flex items-center justify-center cursor-pointer"
          >
            {!isPlaying && (
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-black/60 backdrop-blur-md border border-white/40 flex items-center justify-center text-white"
              >
                <Play className="w-6 h-6 fill-white ml-1" />
              </motion.div>
            )}
          </div>
        )}

        <div className="absolute right-3 sm:right-4 bottom-20 sm:bottom-24 z-30 flex flex-col items-center space-y-3 sm:space-y-4">
          {isCurrent && (
            <button onClick={handleLike} className="flex flex-col items-center group cursor-pointer">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md transition-all ${
                  hasLiked
                    ? 'bg-rose-500 text-white shadow-lg'
                    : 'bg-black/40 hover:bg-black/60 text-white border border-white/20'
                }`}
              >
                <Heart className={`w-5 h-5 ${hasLiked ? 'fill-current' : ''}`} />
              </div>
              <span className="text-[10px] text-white mt-1 font-semibold drop-shadow-md">
                {likeCount}
              </span>
            </button>
          )}

          <a
            href={slideHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              if (wasDraggedRef.current || !isCurrent) {
                e.preventDefault();
                e.stopPropagation();
              }
            }}
            className="w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 border border-white/20 flex items-center justify-center text-white transition-colors"
            title="Instagram"
            aria-label="View reel on Instagram"
          >
            <Instagram className="w-4 h-4" />
          </a>
        </div>

        <div className="absolute inset-x-0 bottom-0 z-20 p-4 sm:p-5 pr-12 sm:pr-16 text-white space-y-1.5 sm:space-y-2 bg-gradient-to-t from-black/80 via-black/30 to-transparent pt-12">
          <div className="flex items-center space-x-1.5 text-xs text-[#E8D5B5]">
            <MapPin className="w-3.5 h-3.5" />
            <span>{slideReel.location}</span>
          </div>

          <p className="font-script-accent text-2xl sm:text-3xl text-[#FFDE99] leading-tight drop-shadow-md">
            {slideReel.title}
          </p>

          <p className="text-xs text-stone-300 font-light leading-snug line-clamp-2">
            {slideReel.description}
          </p>

          <div className="flex items-center space-x-2 pt-1">
            <span className="text-[10px] uppercase tracking-widest text-[#B68A55] font-semibold">
              {section?.studio_label || 'Studio Master'}
            </span>
            <span className="text-stone-400 text-[10px]">•</span>
            <span className="text-[10px] text-stone-300 font-mono">{section?.audio_label || 'Original Sound (48kHz)'}</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-3 sm:p-6"
    >
      <div className="absolute inset-0" onClick={onClose} />

      {onPrev && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            goTo(-1);
          }}
          className="hidden sm:flex absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white items-center justify-center transition-all z-20 cursor-pointer"
          aria-label="Previous Reel"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}

      {onNext && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            goTo(1);
          }}
          className="hidden sm:flex absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white items-center justify-center transition-all z-20 cursor-pointer"
          aria-label="Next Reel"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}

      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        onPointerDown={() => {
          wasDraggedRef.current = false;
        }}
        id="reel-modal-card"
        className="relative w-full max-w-[340px] sm:max-w-[375px] h-[80vh] sm:h-[85vh] max-h-[720px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-white/20 bg-stone-950 z-10 select-none"
        style={{ touchAction: 'none', overscrollBehavior: 'contain' }}
      >
        {/* Peek hint wrapper moves separately from drag strip */}
        <motion.div style={{ y: peekY }} className="absolute inset-0">
          <motion.div
            drag="y"
            dragMomentum={false}
            dragElastic={0.12}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            style={{ y: dragY }}
            className="absolute inset-0"
          >
            <div className="absolute inset-0" style={{ transform: 'translateY(-100%)' }}>
              {renderSlide(prevReel, 'prev')}
            </div>
            <div className="absolute inset-0">
              {renderSlide(reel, 'current')}
            </div>
            <div className="absolute inset-0" style={{ transform: 'translateY(100%)' }}>
              {renderSlide(nextReel, 'next')}
            </div>
          </motion.div>
        </motion.div>

        {/* Swipe instruction */}
        <motion.div
          initial={false}
          animate={{
            opacity: showInstruction ? 1 : 0,
            y: showInstruction ? 0 : 8,
          }}
          transition={{ duration: 0.35, ease: EASE }}
          className="absolute inset-x-0 top-[42%] z-40 flex justify-center pointer-events-none"
        >
          <div className="flex flex-col items-center gap-2 rounded-2xl bg-black/70 backdrop-blur-sm border border-white/15 px-4 py-3 text-center">
            <div className="flex flex-col items-center gap-0.5 text-white/90">
              <svg width="18" height="22" viewBox="0 0 18 22" fill="none" aria-hidden="true">
                <path d="M9 1v16M9 1l-4 4M9 1l4 4M9 21l-4-4M9 21l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <p className="text-[11px] text-white leading-snug max-w-[200px]">
              <span className="font-semibold text-[#E8D5B5]">Swipe up / down</span> to scroll reels
            </p>
          </div>
        </motion.div>

        {/* Floating Hearts */}
        <div className="absolute bottom-24 sm:bottom-28 right-6 sm:right-8 pointer-events-none z-30">
          {floatingHearts.map((heart) => (
            <motion.div
              key={heart.id}
              initial={{ opacity: 1, y: 0, x: heart.x, scale: 0.8 }}
              animate={{ opacity: 0, y: -90, scale: 1.4 }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              className="absolute text-rose-500"
            >
              <Heart className="w-6 h-6 fill-rose-500" />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};
