import React, { useState } from 'react';
import { Play } from 'lucide-react';
import { motion } from 'motion/react';
import { ASSET_URLS } from '../data/studioData';


interface CinematicStorySectionProps {
  onOpenShowreel: () => void;
  onSelectCategory?: (category: string) => void;
}

export const CinematicStorySection: React.FC<CinematicStorySectionProps> = ({
  onOpenShowreel,
  onSelectCategory,
}) => {
  const [activeStoryPill, setActiveStoryPill] = useState('Weddings');

  const storyPills = ['Weddings', 'Haldi', 'Celebrations', 'Traditions'];

  return (
    <section className="bg-[#0D0D0B] text-white pt-24 pb-20 lg:pt-28 lg:pb-28 relative z-20 rounded-t-[40px] sm:rounded-t-[60px] -mt-10 sm:-mt-16 overflow-hidden dark-ambient-grain" id="about">


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
            <div
              onClick={onOpenShowreel}
              className="relative mx-auto max-w-sm sm:max-w-md lg:max-w-none rounded-t-[100px] sm:rounded-t-[140px] lg:rounded-t-[180px] rounded-b-2xl overflow-hidden border border-[#2B2822] shadow-2xl bg-[#171614] aspect-[4/5] group cursor-pointer z-10"
            >
              {/* Palace Courtyard Image with Zoom Effect */}
              <img
                alt="Indian royal couple walking in heritage palace courtyard"
                className="w-full h-full object-cover img-zoom opacity-80 group-hover:opacity-95 transition-all duration-700"
                src={ASSET_URLS.palaceCourtyard}
              />

              {/* Inward Vignette & Lighting Blend */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0B] via-transparent to-black/40" />

              {/* Arched Architectural Accent Overlay Line */}
              <div className="absolute inset-2 sm:inset-3 lg:inset-4 rounded-t-[90px] sm:rounded-t-[130px] lg:rounded-t-[170px] rounded-b-xl border border-[#B68A55]/30 pointer-events-none group-hover:border-[#B68A55]/60 transition-colors duration-500" />

              {/* Hover Center Play Pill Indicator */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <span className="px-3 sm:px-4 py-1.5 sm:py-2 bg-black/70 backdrop-blur-md rounded-full border border-[#B68A55] text-[10px] sm:text-xs font-semibold uppercase tracking-luxury text-[#E8D5B5] flex items-center space-x-2">
                  <Play className="w-3.5 h-3.5 fill-[#B68A55] text-[#B68A55]" />
                  <span>Play Cinematic Film</span>
                </span>
              </div>

              {/* Bottom Golden Watermark */}
              <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 flex items-center justify-between text-[10px] sm:text-xs text-[#C5AA85]">
                <span className="tracking-ultra uppercase text-[10px] font-medium">THE RAJASTHAN TALES</span>
                <span className="font-serif italic text-sm">Jaipur 2024</span>
              </div>
            </div>
          </motion.div>

          {/* Right: Storytelling Copy & Interactive Reel Trigger */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-6 flex flex-col justify-center space-y-7"
          >
            {/* Category Label & Index Marker */}
            <div className="flex items-center justify-between border-b border-[#262420] pb-4">
              <span className="text-xs uppercase tracking-luxury text-[#B68A55] font-semibold">
                THE STORY OF TODAY
              </span>
              <span className="text-xs tracking-widest text-[#787167]">01 / 04</span>
            </div>

            {/* Main Headline */}
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-normal leading-[1.05] text-[#FAF6F0]">
              Some moments<br />
              happen once.
            </h2>

            {/* Golden Accent Line */}
            <div className="w-16 h-[1.5px] bg-[#B68A55]" />

            {/* Poetic Studio Description */}
            <p className="text-base sm:text-lg text-[#9E978C] font-light leading-relaxed max-w-lg">
              From the loudest celebrations to the quietest emotions, we turn real moments into stories worth reliving. Unstaged tears, sudden bursts of laughter, and sacred traditions decoded into immortal cinematic relics.
            </p>

            {/* Interactive Showreel Play Button */}
            <div className="pt-4 flex items-center space-x-6">
              <button
                type="button"
                onClick={onOpenShowreel}
                aria-label="Watch Showreel"
                className="flex items-center space-x-4 group focus:outline-none cursor-pointer"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border border-[#B68A55] flex items-center justify-center bg-[#171614] group-hover:bg-[#B68A55] transition-all duration-300 shadow-md"
                >
                  <Play className="w-4 h-4 sm:w-5 sm:h-5 text-[#B68A55] group-hover:text-black fill-current ml-0.5 transition-colors" />
                </motion.div>
                <div className="flex flex-col text-left">
                  <span className="text-xs uppercase font-bold tracking-luxury text-white group-hover:text-[#B68A55] transition-colors">
                    WATCH SHOWREEL
                  </span>
                  <span className="text-[11px] text-[#787167] tracking-wider">3 MIN 24 SEC • 4K</span>
                </div>
              </button>
            </div>

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
                        ? 'border-[#B68A55] text-[#E0CEB5] bg-[#1F1B16] shadow-sm'
                        : 'border-[#2B2721] text-[#8A8275] hover:border-[#B68A55] hover:text-white bg-[#171614]'
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
