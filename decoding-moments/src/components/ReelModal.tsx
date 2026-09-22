import React, { useState, useEffect, useRef } from 'react';
import { X, Play, Pause, Heart, Volume2, VolumeX, Share2, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ReelItem } from '../types';

interface ReelModalProps {
  reel: ReelItem | null;
  onClose: () => void;
  onNext?: () => void;
  onPrev?: () => void;
  section?: Record<string, string>;
}

export const ReelModal: React.FC<ReelModalProps> = ({ reel, onClose, onNext, onPrev, section }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [likeCount, setLikeCount] = useState(reel?.likes || 1200);
  const [hasLiked, setHasLiked] = useState(false);
  const [floatingHearts, setFloatingHearts] = useState<{ id: number; x: number }[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (reel) {
      setLikeCount(reel.likes);
      setHasLiked(false);
      setProgress(0);
      setIsPlaying(true);
    }
  }, [reel]);

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

  // Simulate smooth reel playback timer (only when no video)
  useEffect(() => {
    if (!isPlaying || !reel || reel.video) return;
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          return 0;
        }
        return prev + 1.2;
      });
    }, 100);
    return () => clearInterval(interval);
  }, [isPlaying, reel]);

  // Track real video progress
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

  const handleLike = () => {
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

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-3 sm:p-6">
        {/* Backdrop click */}
        <div className="absolute inset-0" onClick={onClose} />

        {/* Carousel Navigation Buttons */}
        {onPrev && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
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
              onNext();
            }}
            className="hidden sm:flex absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white items-center justify-center transition-all z-20 cursor-pointer"
            aria-label="Next Reel"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}

        {/* Reel Container (9:16 Aspect Ratio) */}
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
            {reel.video ? (
              <video
                ref={videoRef}
                src={reel.video.url}
                poster={reel.posterUrl || undefined}
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
                style={{ backgroundImage: `url('${reel.posterUrl}')` }}
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
                  {reel.badge}
                </span>
                <span className="text-xs text-stone-300 font-medium">
                  {reel.category}
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

          {/* Center Play/Pause Tap Overlay */}
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

          {/* Floating Hearts Container */}
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

          {/* Right Floating Actions (Heart, Share) */}
          <div className="absolute right-3 sm:right-4 bottom-20 sm:bottom-24 z-20 flex flex-col items-center space-y-3 sm:space-y-4">
            <button
              onClick={handleLike}
              className="flex flex-col items-center group cursor-pointer"
            >
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

            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: reel.title,
                    text: reel.description,
                    url: window.location.href,
                  }).catch(() => {});
                } else {
                  navigator.clipboard.writeText(window.location.href);
                }
              }}
              className="w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 border border-white/20 flex items-center justify-center text-white transition-colors"
              title="Share Reel"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>

          {/* Bottom Caption & Audio Info */}
          <div className="relative z-20 p-4 sm:p-5 pr-12 sm:pr-16 text-white space-y-1.5 sm:space-y-2">
            <div className="flex items-center space-x-1.5 text-xs text-[#E8D5B5]">
              <MapPin className="w-3.5 h-3.5" />
              <span>{reel.location}</span>
            </div>

            <p className="font-script-accent text-2xl sm:text-3xl text-[#FFDE99] leading-tight drop-shadow-md">
              {reel.title}
            </p>

            <p className="text-xs text-stone-300 font-light leading-snug line-clamp-2">
              {reel.description}
            </p>

            <div className="flex items-center space-x-2 pt-1">
              <span className="text-[10px] uppercase tracking-widest text-[#B68A55] font-semibold">
                {section?.studio_label || 'Studio Master'}
              </span>
              <span className="text-stone-400 text-[10px]">•</span>
              <span className="text-[10px] text-stone-300 font-mono">{section?.audio_label || 'Original Sound (48kHz)'}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
