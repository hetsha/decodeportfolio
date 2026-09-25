import React, { useState, useEffect } from 'react';
import { X, Play, Pause, Volume2, VolumeX, Maximize2, Film } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ShowreelModalProps {
  isOpen: boolean;
  onClose: () => void;
  assetUrl?: string;
  section?: Record<string, string>;
}

export const ShowreelModal: React.FC<ShowreelModalProps> = ({ isOpen, onClose, assetUrl, section }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(42); // seconds
  const totalDuration = 204; // 3 min 24 sec

  const chapters = [
    { title: section?.chapter1 || 'The Arrival at Amber', time: 0 },
    { title: section?.chapter2 || 'Golden Haldi Rituals', time: 45 },
    { title: section?.chapter3 || 'Sangeet Celebration', time: 110 },
    { title: section?.chapter4 || 'Sunset Courtyard Pheras', time: 165 },
  ];

  useEffect(() => {
    if (!isOpen || !isPlaying) return;
    const interval = setInterval(() => {
      setCurrentTime((prev) => (prev >= totalDuration ? 0 : prev + 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [isOpen, isPlaying]);

  /* Every open starts the showreel from the top, already playing */
  useEffect(() => {
    if (!isOpen) return;
    setIsPlaying(true);
    setIsMuted(false);
    setCurrentTime(0);
  }, [isOpen]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex justify-center bg-black/90 backdrop-blur-lg p-4 sm:p-8 overflow-y-auto">
        <div className="fixed inset-0" onClick={onClose} />

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.94 }}
          className="relative w-full max-w-5xl my-auto bg-[#0F0E0C] border border-[#2B2721] rounded-2xl overflow-hidden shadow-2xl z-10 flex flex-col"
        >
          {/* Top Bar */}
          <div className="p-4 sm:p-5 flex items-center justify-between border-b border-[#221F1A] bg-[#0A0A09] text-white">
            <div className="flex items-center space-x-3">
              <Film className="w-5 h-5 text-[#B68A55]" />
              <div>
                <h3 className="font-serif text-lg sm:text-xl text-[#FAF6F0] font-medium leading-none">
                  {section?.title || 'The Rajasthan Tales'}
                </h3>
                <span className="text-[10px] uppercase tracking-luxury text-[#9E9589]">
                  {section?.subtitle || 'Master Showreel • Jaipur 2024 • 4K DCI'}
                </span>
              </div>
            </div>
          </div>

          {/* Cinematic 16:9 Stage with Letterbox Aspect */}
          <div className="relative aspect-video w-full bg-black flex items-center justify-center overflow-hidden group">
            {/* Film Image with Ken Burns Effect */}
            <motion.div
              animate={isPlaying ? { scale: [1, 1.05, 1] } : { scale: 1 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
              className="w-full h-full bg-cover bg-center"
              style={assetUrl ? { backgroundImage: `url('${assetUrl}')` } : undefined}
            />

            {/* Subtle Film Grain & Letterbox Mattes */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/50 pointer-events-none" />

            {/* Sound + close — same layout as the reel modal */}
            <div className="absolute top-3 right-3 z-30 flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsMuted(!isMuted)}
                aria-label={isMuted ? 'Unmute showreel' : 'Mute showreel'}
                className="p-1.5 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-sm text-white transition-colors cursor-pointer"
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close showreel"
                className="p-1.5 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-sm text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Center Play/Pause Trigger */}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="absolute inset-0 flex items-center justify-center cursor-pointer"
            >
              {!isPlaying && (
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-black/60 backdrop-blur-md border border-[#B68A55] flex items-center justify-center text-white shadow-2xl">
                  <Play className="w-6 h-6 sm:w-8 sm:h-8 fill-[#B68A55] text-[#B68A55] ml-1" />
                </div>
              )}
            </button>

            {/* Watermark Crest */}
            <div className="absolute top-4 left-6 pointer-events-none opacity-40">
              <span className="font-serif text-xs tracking-ultra uppercase text-white">
                {section?.watermark || 'DM STUDIOS • ARCHIVES'}
              </span>
            </div>
          </div>

          {/* Player Controls Bar */}
          <div className="p-4 bg-[#0A0A09] border-t border-[#221F1A] text-white flex flex-col space-y-3">
            {/* Scrubber Progress Bar */}
            <div
              className="w-full h-1.5 bg-stone-800 hover:h-2 rounded-full cursor-pointer relative group transition-all"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const clickX = e.clientX - rect.left;
                const pct = clickX / rect.width;
                setCurrentTime(Math.floor(pct * totalDuration));
              }}
            >
              <div
                className="h-full bg-[#B68A55] rounded-full relative"
                style={{ width: `${(currentTime / totalDuration) * 100}%` }}
              >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-stone-300">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-2 hover:text-[#B68A55] transition-colors"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                </button>

                <span className="font-mono text-[11px] text-stone-400">
                  {formatTime(currentTime)} / {formatTime(totalDuration)}
                </span>
              </div>

              {/* Chapter Markers */}
              <div className="hidden sm:flex items-center space-x-2">
                {chapters.map((ch) => (
                  <button
                    key={ch.title}
                    onClick={() => setCurrentTime(ch.time)}
                    className={`px-2.5 py-1 text-[10px] rounded-sm transition-colors ${
                      currentTime >= ch.time && (chapters[chapters.indexOf(ch) + 1] ? currentTime < chapters[chapters.indexOf(ch) + 1].time : true)
                        ? 'bg-[#B68A55] text-black font-bold'
                        : 'bg-[#171614] text-stone-400 hover:text-white'
                    }`}
                  >
                    {ch.title}
                  </button>
                ))}
              </div>

              <div className="flex items-center space-x-3">
                <span className="text-[10px] tracking-wider uppercase text-[#B68A55] border border-[#B68A55]/40 px-2 py-0.5 rounded">
                  {section?.quality_badge || '4K UHD'}
                </span>
                <Maximize2 className="w-4 h-4 text-stone-400 hover:text-white cursor-pointer" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
