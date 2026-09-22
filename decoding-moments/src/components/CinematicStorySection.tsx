import React, { useState, useRef, useEffect } from 'react';
import { Play, X, Volume2, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import type { CinematicStory } from '../types';


interface CinematicStorySectionProps {
  onOpenShowreel: () => void;
  onSelectCategory?: (category: string) => void;
  assetUrl?: string;
  section?: Record<string, string>;
  cinematicStories?: CinematicStory[];
}

export const CinematicStorySection: React.FC<CinematicStorySectionProps> = ({
  onOpenShowreel,
  onSelectCategory,
  assetUrl,
  section,
  cinematicStories = [],
}) => {
  const [activeStoryPill, setActiveStoryPill] = useState('Weddings');
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const [isPortrait, setIsPortrait] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const storyPills = cinematicStories.length > 0
    ? [...new Set(cinematicStories.map((s) => s.category).filter(Boolean))]
    : (section?.categories || '').split('|').map((s) => s.trim()).filter(Boolean);

  const activeStory = cinematicStories.find((s) => s.category === activeStoryPill) || cinematicStories[0];

  const coverUrl = activeStory?.coverImageUrl || assetUrl || '';
  const videoUrl = activeStory?.videoUrl || '';
  const headline = activeStory?.headline || section?.headline || 'Some moments happen once.';
  const description = activeStory?.description || section?.description || 'From the loudest celebrations to the quietest emotions, we turn real moments into stories worth reliving. Unstaged tears, sudden bursts of laughter, and sacred traditions decoded into immortal cinematic relics.';
  const sectionLabel = activeStory?.sectionLabel || section?.section_label || 'THE STORY OF TODAY';
  const watermarkLeft = activeStory?.watermarkLeft || section?.watermark_left || 'THE RAJASTHAN TALES';
  const watermarkRight = activeStory?.watermarkRight || section?.watermark_right || 'Jaipur 2024';
  const playLabel = activeStory?.playLabel || section?.play_label || 'Play Cinematic Film';
  const showreelCta = activeStory?.showreelCta || section?.showreel_cta || 'WATCH SHOWREEL';
  const showreelDuration = activeStory?.showreelDuration || section?.showreel_duration || '3 MIN 24 SEC • 4K';

  const headlineWords = headline.split(' ');
  const midIndex = Math.ceil(headlineWords.length / 2);

  const handlePlayClick = () => {
    if (videoUrl) {
      setIsVideoOpen(true);
    } else {
      onOpenShowreel();
    }
  };

  const handleVideoMetadata = () => {
    if (videoRef.current) {
      const { videoWidth, videoHeight } = videoRef.current;
      setIsPortrait(videoHeight > videoWidth);
    }
  };

  useEffect(() => {
    if (isVideoOpen && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, [isVideoOpen]);

  useEffect(() => {
    setIsPortrait(false);
    if (videoRef.current && isVideoOpen) {
      videoRef.current.load();
    }
  }, [activeStoryPill, isVideoOpen]);

  return (
    <section className="bg-[#0d1f1a] text-white pt-24 pb-20 lg:pt-28 lg:pb-28 relative z-20 rounded-t-[40px] sm:rounded-t-[60px] -mt-10 sm:-mt-16 overflow-hidden dark-ambient-grain" id="about">

      {/* Background Image with Atmospheric Gradients */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        {assetUrl && <img
          alt=""
          className="w-full h-full object-cover opacity-20 filter brightness-75"
          src={assetUrl}
        />}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d1f1a] via-[#0d1f1a]/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d1f1a] via-transparent to-[#0d1f1a]" />
      </div>

      {/* Inline Video Player Overlay */}
      <AnimatePresence>
        {isVideoOpen && videoUrl && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/95 backdrop-blur-lg p-4"
          >
            <div className="absolute inset-0" onClick={() => { setIsVideoOpen(false); if (videoRef.current) { videoRef.current.pause(); } }} />

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className={`relative z-10 ${isPortrait ? 'max-w-sm sm:max-w-md' : 'w-full max-w-5xl'}`}
            >
              <button
                onClick={() => { setIsVideoOpen(false); if (videoRef.current) { videoRef.current.pause(); } }}
                className="absolute -top-12 right-0 p-2 rounded-full text-white/70 hover:text-white transition-colors cursor-pointer z-20"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="rounded-xl overflow-hidden shadow-2xl bg-black">
                <video
                  ref={videoRef}
                  src={videoUrl}
                  controls
                  muted={isVideoMuted}
                  onLoadedMetadata={handleVideoMetadata}
                  className={`w-full ${isPortrait ? 'aspect-[9/16] max-h-[70vh]' : 'aspect-video'}`}
                  playsInline
                />
              </div>

              <div className="flex items-center justify-between mt-3 px-1">
                <span className="text-xs text-[#B68A55] font-serif italic">{watermarkLeft}</span>
                <button
                  onClick={() => setIsVideoMuted(!isVideoMuted)}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                >
                  {isVideoMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ambient Lighting Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_40%,rgba(182,138,85,0.08)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left: Arched Palace Courtyard Landscape Photo with Indian Arch Frame */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            className="lg:col-span-6 relative"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStoryPill}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                onClick={handlePlayClick}
                className="relative mx-auto max-w-sm sm:max-w-md lg:max-w-none rounded-t-[100px] sm:rounded-t-[140px] lg:rounded-t-[180px] rounded-b-2xl overflow-hidden border border-[#1a3a2e] shadow-2xl bg-[#0a2a1f] aspect-[4/5] group cursor-pointer z-10"
              >
                {/* Palace Courtyard Image with Zoom Effect */}
                {coverUrl && <img
                  alt="Indian royal couple walking in heritage palace courtyard"
                  className="w-full h-full object-cover img-zoom opacity-80 group-hover:opacity-95 transition-all duration-700"
                  src={coverUrl}
                />}

                {/* Inward Vignette & Lighting Blend */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d1f1a] via-transparent to-black/40" />

                {/* Arched Architectural Accent Overlay Line */}
                <div className="absolute inset-2 sm:inset-3 lg:inset-4 rounded-t-[90px] sm:rounded-t-[130px] lg:rounded-t-[170px] rounded-b-xl border border-[#B68A55]/30 pointer-events-none group-hover:border-[#B68A55]/60 transition-colors duration-500" />

                {/* Hover Center Play Pill Indicator */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <span className="px-3 sm:px-4 py-1.5 sm:py-2 bg-black/70 backdrop-blur-md rounded-full border border-[#B68A55] text-[10px] sm:text-xs font-semibold uppercase tracking-luxury text-[#E8D5B5] flex items-center space-x-2">
                    <Play className="w-3.5 h-3.5 fill-[#B68A55] text-[#B68A55]" />
                    <span>{videoUrl ? playLabel : 'Watch Showreel'}</span>
                  </span>
                </div>

                {/* Bottom Golden Watermark */}
                <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 flex items-center justify-between text-[10px] sm:text-xs text-[#C5AA85]">
                  <span className="tracking-ultra uppercase text-[10px] font-medium">{watermarkLeft}</span>
                  <span className="font-serif italic text-sm">{watermarkRight}</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Right: Storytelling Copy & Interactive Reel Trigger */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-6 flex flex-col justify-center space-y-7"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStoryPill}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col space-y-7"
              >
                {/* Category Label & Index Marker */}
                <div className="flex items-center justify-between border-b border-[#262420] pb-4">
                  <span className="text-xs uppercase tracking-luxury text-[#B68A55] font-semibold">
                    {sectionLabel}
                  </span>
                  <span className="text-xs tracking-widest text-[#787167]">
                    {String(storyPills.indexOf(activeStoryPill) + 1).padStart(2, '0')} / {String(storyPills.length).padStart(2, '0')}
                  </span>
                </div>

                {/* Main Headline */}
                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-normal leading-[1.05] text-[#FAF6F0]">
                  {headlineWords.slice(0, midIndex).join(' ')}<br />
                  {headlineWords.slice(midIndex).join(' ')}
                </h2>

                {/* Golden Accent Line */}
                <div className="w-16 h-[1.5px] bg-[#B68A55]" />

                {/* Poetic Studio Description */}
                <p className="text-base sm:text-lg text-[#9E978C] font-light leading-relaxed max-w-lg">
                  {description}
                </p>

                {/* Interactive Showreel Play Button */}
                <div className="pt-4 flex items-center space-x-6">
                  <button
                    type="button"
                    onClick={handlePlayClick}
                    aria-label="Watch Showreel"
                    className="flex items-center space-x-4 group focus:outline-none cursor-pointer"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                        className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border border-[#B68A55] flex items-center justify-center bg-[#0a2a1f] group-hover:bg-[#B68A55] transition-all duration-300 shadow-md"
                    >
                      <Play className="w-4 h-4 sm:w-5 sm:h-5 text-[#B68A55] group-hover:text-black fill-current ml-0.5 transition-colors" />
                    </motion.div>
                    <div className="flex flex-col text-left">
                      <span className="text-xs uppercase font-bold tracking-luxury text-white group-hover:text-[#B68A55] transition-colors">
                        {showreelCta}
                      </span>
                      <span className="text-[11px] text-[#787167] tracking-wider">{showreelDuration}</span>
                    </div>
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Sub-categories horizontal pill index */}
            <div className="pt-6 sm:pt-8 flex flex-wrap gap-2 sm:gap-3 text-[10px] sm:text-xs tracking-wider uppercase text-[#8A8275]">
              {storyPills.map((pill) => {
                const isActive = activeStoryPill === pill;
                return (
                  <button
                    key={pill}
                    type="button"
                    onClick={() => {
                      setActiveStoryPill(pill);
                      onSelectCategory?.(pill);
                    }}
                    className={`px-3.5 py-1.5 rounded-full border transition-all duration-300 cursor-pointer ${
                      isActive
                        ? 'border-[#B68A55] text-[#E0CEB5] bg-[#1a3a2e] shadow-sm'
                        : 'border-[#1a3a2e] text-[#8A8275] hover:border-[#B68A55] hover:text-white bg-[#0a2a1f]'
                    }`}
                  >
                    {pill}
                  </button>
                );
              })}
            </div>
          </motion.div>

        </div>
      </div>

      {/* Bottom Wave Arch Transition back to Light Paper Texture */}
      <div className="absolute bottom-0 inset-x-0 w-full overflow-hidden leading-none z-10 pointer-events-none">
        <svg
          className="relative block w-full h-14 sm:h-24 lg:h-28 text-[#F5EFE6]"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 1440 120"
        >
          <path d="M0,60 Q720,120 1440,60 L1440,120 L0,120 Z" fill="currentColor" />
          <path d="M0,60 Q720,120 1440,60" opacity="0.35" stroke="#B68A55" strokeWidth="1.5" />
        </svg>
      </div>
    </section>
  );
};
