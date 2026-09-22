import React, { useState, useEffect, useRef } from 'react';
import { X, Play, Pause, Volume2, VolumeX, ChevronLeft, ChevronRight, ExternalLink, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { StoryChapter } from '../types';

interface StoryChapterModalProps {
  chapter: StoryChapter | null;
  chapters: StoryChapter[];
  onClose: () => void;
  onNext?: () => void;
  onPrev?: () => void;
  section?: Record<string, string>;
}

export const StoryChapterModal: React.FC<StoryChapterModalProps> = ({
  chapter,
  chapters,
  onClose,
  onNext,
  onPrev,
  section,
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (chapter) {
      setProgress(0);
      setIsPlaying(true);
    }
  }, [chapter]);

  useEffect(() => {
    if (videoRef.current) {
      isPlaying ? videoRef.current.play().catch(() => {}) : videoRef.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  useEffect(() => {
    if (!chapter?.videoUrl || !videoRef.current) return;
    const video = videoRef.current;
    const updateProgress = () => {
      if (video.duration) {
        setProgress((video.currentTime / video.duration) * 100);
      }
    };
    video.addEventListener('timeupdate', updateProgress);
    return () => video.removeEventListener('timeupdate', updateProgress);
  }, [chapter?.videoUrl]);

  useEffect(() => {
    if (!isPlaying || !chapter?.videoUrl) return;
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 1.2));
    }, 100);
    return () => clearInterval(interval);
  }, [isPlaying, chapter?.videoUrl]);

  if (!chapter) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-3 sm:p-6">
        <div className="absolute inset-0" onClick={onClose} />

        {/* Prev Button */}
        {onPrev && (
          <button
            onClick={(e) => { e.stopPropagation(); onPrev(); }}
            className="hidden sm:flex absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white items-center justify-center transition-all z-20 cursor-pointer"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        {/* Next Button */}
        {onNext && (
          <button
            onClick={(e) => { e.stopPropagation(); onNext(); }}
            className="hidden sm:flex absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white items-center justify-center transition-all z-20 cursor-pointer"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}

        {/* Video Container (9:16 Aspect Ratio) */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-[340px] sm:max-w-[375px] h-[80vh] sm:h-[85vh] max-h-[720px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-white/20 bg-stone-950 flex flex-col justify-between z-10 select-none"
        >
          {/* Video or Poster Background */}
          <div className="absolute inset-0 overflow-hidden">
            {chapter.videoUrl ? (
              <video
                ref={videoRef}
                src={chapter.videoUrl}
                poster={chapter.imageUrl}
                className="w-full h-full object-cover"
                autoPlay
                muted={isMuted}
                loop
                playsInline
              />
            ) : (
              <motion.div
                animate={isPlaying ? { scale: [1, 1.08, 1] } : { scale: 1 }}
                transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url('${chapter.imageUrl}')` }}
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-black/60 pointer-events-none" />
          </div>

          {/* Top Info Bar */}
          <div className="relative z-20 p-3 sm:p-4 pt-4 sm:pt-5 flex flex-col space-y-2">
            {/* Progress Bar */}
            <div className="w-full h-1 bg-white/25 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-[#E8D5B5]"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-white pt-2">
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-bold tracking-widest uppercase bg-black/50 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/20 text-[#E8D5B5]">
                  {chapter.tag}
                </span>
                <span className="text-xs text-stone-300 font-medium">
                  {chapter.category}
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-1.5 rounded-full bg-black/40 hover:bg-black/60 text-white transition-colors"
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-full bg-black/40 hover:bg-black/60 text-white transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Center Play/Pause */}
          <div
            onClick={() => setIsPlaying(!isPlaying)}
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

          {/* Bottom Caption */}
          <div className="relative z-20 p-4 sm:p-5 pr-12 sm:pr-16 text-white space-y-1.5 sm:space-y-2">
            <div className="flex items-center space-x-1.5 text-xs text-[#E8D5B5]">
              <MapPin className="w-3.5 h-3.5" />
              <span>{chapter.location}</span>
            </div>

            <p className="font-script-accent text-2xl sm:text-3xl text-[#FFDE99] leading-tight drop-shadow-md">
              {chapter.title}
            </p>

            <p className="text-xs text-stone-300 font-light leading-snug">
              {chapter.subtitle} {chapter.clientName ? `• ${chapter.clientName}` : ''}
            </p>

            {/* Instagram Button */}
            {chapter.instagramUrl && (
              <a
                href={chapter.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center space-x-1.5 mt-2 px-3 py-1.5 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white text-[10px] uppercase tracking-widest font-bold rounded-full transition-all"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
                <span>Open in Instagram</span>
              </a>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
