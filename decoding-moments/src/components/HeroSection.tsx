import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Volume2, VolumeX, Play } from 'lucide-react';
import { motion } from 'motion/react';
import { HERO_REELS, ASSET_URLS } from '../data/studioData';
import { ReelItem } from '../types';
import { IndianLotusBotanicalSvg, IndianArchSvg } from './IndianMotifs';
import { DecodingMomentsLogo } from './DecodingMomentsLogo';

interface HeroSectionProps {
  onSelectReel: (reel: ReelItem) => void;
  onFilterCategory?: (cat: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onSelectReel, onFilterCategory }) => {
  const [activeReelIndex, setActiveReelIndex] = useState(0);
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [clientCount, setClientCount] = useState(420);

  // Animated client counter on load
  useEffect(() => {
    const timer = setInterval(() => {
      setClientCount((prev) => {
        if (prev >= 500) {
          clearInterval(timer);
          return 500;
        }
        return prev + 4;
      });
    }, 40);
    return () => clearInterval(timer);
  }, []);

  const categories = ['Weddings', 'Celebrations', 'Traditions', 'Brands', 'Travel'];
  const centerReel = HERO_REELS[activeReelIndex % HERO_REELS.length];
  const leftReel = HERO_REELS[(activeReelIndex + 1) % HERO_REELS.length];
  const rightReel = HERO_REELS[(activeReelIndex + 2) % HERO_REELS.length];

  return (
    <section className="relative pt-10 pb-20 lg:pt-16 lg:pb-32 overflow-hidden paper-texture" id="home">
      {/* Mughal Arch Line Art - Top Left Corner with subtle animation */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 0.45, x: 0 }}
        transition={{ duration: 1.4, ease: 'easeOut' }}
        className="absolute -top-14 -left-14 w-80 sm:w-96 h-80 sm:h-96 pointer-events-none mix-blend-multiply z-0 select-none"
      >
        <IndianArchSvg animated={true} color="#A67C4E" className="w-full h-full opacity-80" />
      </motion.div>

      {/* Lotus Botanical Line Art - Top Right with Floating Breathing Animation */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{
          opacity: [0.35, 0.55, 0.35],
          y: [0, -12, 0],
          rotate: [0, 2, 0],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute -top-10 -right-16 sm:-right-8 w-72 sm:w-80 lg:w-96 h-auto pointer-events-none mix-blend-multiply z-0 select-none"
      >
        <IndianLotusBotanicalSvg animated={true} color="#B68A55" className="w-full h-full" />
      </motion.div>

      {/* Floating Sparkle Micro-Particles */}
      <motion.div
        animate={{ opacity: [0.2, 0.5, 0.2], y: [-5, 5, -5] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/3 left-1/4 w-2 h-2 rounded-full bg-[#B68A55]/40 blur-xs pointer-events-none"
      />
      <motion.div
        animate={{ opacity: [0.1, 0.4, 0.1], y: [5, -8, 5] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute top-1/2 right-1/3 w-3 h-3 rounded-full bg-[#B68A55]/30 blur-xs pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Editorial Typography & Micro-Interactions */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex flex-col justify-center space-y-7 z-10"
          >
            {/* The Golden Thread that creates the website: Origin Connection */}
            <div className="flex items-center space-x-3.5">
              <div className="w-10 h-10 p-1 border border-[#B68A55]/40 rounded-sm bg-[#FAF6F0] shadow-sm flex items-center justify-center">
                <DecodingMomentsLogo variant="monogram" className="w-full h-full" colorMode="gold" />
              </div>
              <div className="flex items-center space-x-2.5 text-[10px] sm:text-xs tracking-ultra uppercase text-[#7A756D] font-medium">
                <span>CAPTURE</span>
                <span className="text-[#B68A55]">×</span>
                <span>CREATE</span>
                <span className="text-[#B68A55]">×</span>
                <span>RELIVE</span>
              </div>
            </div>

            {/* Main Hero Title with Golden Thread Accent */}
            <div className="relative">
              {/* Vertical subtle gold thread line next to title */}
              <div className="absolute -left-5 top-2 bottom-2 w-[1.5px] bg-gradient-to-b from-[#B68A55] via-[#E8DFC0] to-transparent hidden sm:block" />
              <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl font-normal leading-[0.95] tracking-tight text-[#171614]">
                DECODING<br />
                <span className="italic font-normal">MOMENTS</span>
              </h1>
            </div>

            {/* Emotive Tagline */}
            <p className="text-base sm:text-lg text-[#5A554E] font-light max-w-sm leading-relaxed">
              Every moment has a story. We make sure it lives forever.
            </p>

            {/* CTAs & Exploration */}
            <div className="pt-2 flex flex-wrap items-center gap-6">
              <a
                href="#work"
                className="inline-flex items-center space-x-3 group cursor-pointer"
              >
                <motion.span
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-11 h-11 rounded-full bg-[#171614] text-white flex items-center justify-center group-hover:bg-[#A67C4E] transition-colors duration-300 shadow-md"
                >
                  <ArrowUpRight className="w-4 h-4" />
                </motion.span>
                <span className="text-xs font-semibold uppercase tracking-luxury text-[#171614] group-hover:text-[#A67C4E] transition-colors duration-300">
                  EXPLORE OUR WORK
                </span>
              </a>

              <a
                href="#services"
                className="hidden sm:flex items-center space-x-3 text-xs uppercase tracking-luxury text-[#8C8479] hover:text-[#171614] transition-colors"
              >
                <span className="w-10 h-[1px] bg-[#C5BAA8]" />
                <span>SCROLL DOWN</span>
              </a>
            </div>

            {/* Proof & Client Trust Row */}
            <div className="pt-8 sm:pt-10 flex items-center space-x-4 border-t border-[#E3D7C7]/80">
              <div className="flex -space-x-3">
                <div className="w-10 h-10 rounded-full border-2 border-[#F5EFE6] bg-[#2E2820] flex items-center justify-center text-white text-[11px] font-semibold shadow-sm">
                  SK
                </div>
                <div className="w-10 h-10 rounded-full border-2 border-[#F5EFE6] bg-[#594833] flex items-center justify-center text-white text-[11px] font-semibold shadow-sm">
                  AR
                </div>
                <div className="w-10 h-10 rounded-full border-2 border-[#F5EFE6] bg-[#826E52] flex items-center justify-center text-white text-[11px] font-semibold shadow-sm">
                  MV
                </div>
              </div>
              <div>
                <p className="text-base font-bold text-[#171614] leading-tight font-mono">{clientCount}+</p>
                <p className="text-[11px] uppercase tracking-wider text-[#7A756D]">Happy Clients</p>
              </div>
            </div>
          </motion.div>

          {/* Center Column: 3 Layered Vertical Reels with Tilt and Motion */}
          <div className="lg:col-span-5 relative flex justify-center items-center py-6 sm:py-10">
            {/* Floating Cursive Annotation */}
            <motion.div
              initial={{ opacity: 0, rotate: -10, y: -10 }}
              animate={{ opacity: 1, rotate: -6, y: [0, -6, 0] }}
              transition={{
                opacity: { delay: 0.3, duration: 0.8 },
                rotate: { delay: 0.3, duration: 0.8 },
                y: { duration: 6, repeat: Infinity, ease: 'easeInOut' }
              }}
              className="absolute -top-6 left-6 z-20 pointer-events-none"
            >
              <p className="font-script-accent text-2xl sm:text-3xl text-[#8E785C] leading-none select-none">
                More than memories.<br />
                <span className="text-xl sm:text-2xl text-[#6B5A44]">Stories that live on.</span>
              </p>
            </motion.div>

            {/* Vertical Reel Trio Layout with gentle floating motion */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
              className="relative w-full max-w-[360px] sm:max-w-[420px] h-[520px] sm:h-[580px] flex items-center justify-center"
            >
              {/* Radial Warm Golden Glow */}
              <div className="absolute -inset-10 bg-[radial-gradient(circle_at_center,rgba(212,143,41,0.22)_0%,rgba(182,138,85,0.08)_45%,transparent_75%)] rounded-full blur-2xl pointer-events-none z-0" />

              {/* Left Background Reel (Groom/Wedding Portrait) */}
              <motion.div
                whileHover={{ scale: 0.98, rotate: -3 }}
                onClick={() => {
                  setActiveReelIndex((prev) => (prev - 1 + HERO_REELS.length) % HERO_REELS.length);
                }}
                className="absolute -left-4 sm:left-0 w-44 sm:w-52 h-[380px] sm:h-[440px] rounded-2xl overflow-hidden shadow-2xl transform -rotate-6 scale-95 opacity-80 z-0 border-2 border-white/60 bg-stone-800 cursor-pointer transition-all duration-300 group"
              >
                <div className="w-full h-full bg-gradient-to-t from-black/80 via-black/20 to-transparent absolute inset-0 z-10" />
                <div className="w-full h-full bg-[#3E342B] flex flex-col justify-end p-4 text-white relative">
                  <div
                    className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-75 group-hover:scale-105 transition-transform duration-700"
                    style={{ backgroundImage: `url('${leftReel.posterUrl}')` }}
                  />
                  <div className="z-20">
                    <span className="text-[10px] tracking-widest uppercase text-[#D5B990]">
                      {leftReel.badge}
                    </span>
                    <p className="font-serif text-sm font-semibold">{leftReel.title}</p>
                    <p className="text-[10px] text-stone-300">{leftReel.location}</p>
                  </div>
                </div>
              </motion.div>

              {/* Right Background Reel (Traditional Bride / Celebrations) */}
              <motion.div
                whileHover={{ scale: 0.98, rotate: 3 }}
                onClick={() => {
                  setActiveReelIndex((prev) => (prev + 1) % HERO_REELS.length);
                }}
                className="absolute -right-4 sm:right-0 w-44 sm:w-52 h-[380px] sm:h-[440px] rounded-2xl overflow-hidden shadow-2xl transform rotate-6 scale-95 opacity-80 z-0 border-2 border-white/60 bg-stone-800 cursor-pointer transition-all duration-300 group"
              >
                <div className="w-full h-full bg-gradient-to-t from-black/80 via-black/20 to-transparent absolute inset-0 z-10" />
                <div className="w-full h-full bg-[#4A3228] flex flex-col justify-end p-4 text-white relative">
                  <div
                    className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-75 group-hover:scale-105 transition-transform duration-700"
                    style={{ backgroundImage: `url('${rightReel.posterUrl}')` }}
                  />
                  <div className="z-20">
                    <span className="text-[10px] tracking-widest uppercase text-[#D5B990]">
                      {rightReel.badge}
                    </span>
                    <p className="font-serif text-sm font-semibold">{rightReel.title}</p>
                    <p className="text-[10px] text-stone-300">{rightReel.location}</p>
                  </div>
                </div>
              </motion.div>

              {/* Main Central Featured Reel (Dominant & Interactive) */}
              <motion.div
                layout
                whileHover={{ scale: 1.02 }}
                onClick={() => onSelectReel(centerReel)}
                className="relative w-56 sm:w-64 h-[460px] sm:h-[520px] rounded-3xl overflow-hidden shadow-floating-reel border-4 border-[#FAF6F0] z-10 group cursor-pointer bg-[#201A15]"
              >
                {/* Simulated Video Frame Background with Warm Golden Tone */}
                <div className="absolute inset-0 bg-[#D48F29] bg-gradient-to-br from-[#733F17] via-[#C98226] to-[#E3A336] transition-transform duration-700 group-hover:scale-105">
                  <div
                    className="w-full h-full bg-cover bg-center opacity-90 mix-blend-multiply transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url('${centerReel.posterUrl}')` }}
                  />
                </div>

                {/* Vignette & Overlays */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-black/85 pointer-events-none" />

                {/* Top Reel Header Info */}
                <div className="absolute top-4 inset-x-4 flex justify-between items-center text-white/90 text-xs z-20">
                  <span className="text-[10px] uppercase font-semibold tracking-widest bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/20">
                    {centerReel.badge}
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsAudioMuted(!isAudioMuted);
                    }}
                    className="p-1 rounded-full bg-black/30 hover:bg-black/60 backdrop-blur-sm text-white transition-colors"
                    aria-label="Toggle sound"
                  >
                    {isAudioMuted ? (
                      <VolumeX className="w-3.5 h-3.5" />
                    ) : (
                      <Volume2 className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>

                {/* Central Play Trigger with Ripple Animation */}
                <div className="absolute inset-0 flex items-center justify-center z-20">
                  <motion.div
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-14 h-14 rounded-full bg-white/25 backdrop-blur-md border border-white/60 flex items-center justify-center text-white shadow-xl transition-all duration-300"
                  >
                    <Play className="w-5 h-5 fill-white text-white ml-0.5" />
                  </motion.div>
                </div>

                {/* Bottom Reel Caption */}
                <div className="absolute bottom-5 inset-x-5 text-white z-20">
                  <p className="font-script-accent text-2xl text-[#FFDE99] drop-shadow-sm leading-tight">
                    {centerReel.title}
                  </p>
                  <div className="flex items-center justify-between text-[11px] text-stone-200 mt-1">
                    <span className="tracking-wider uppercase font-medium">Real Moments</span>
                    <span className="text-[10px] opacity-75">{centerReel.duration}</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Right Column: Handwritten Vertical Category Nav & Page Index */}
          <div className="hidden lg:col-span-2 lg:flex flex-col justify-between items-end h-[500px] text-right pl-6 z-10">
            {/* Handwritten Vertical Category Badges */}
            <div className="space-y-4">
              {categories.map((category) => (
                <span
                  key={category}
                  onClick={() => onFilterCategory?.(category)}
                  className="block font-script-accent text-2xl text-[#8E785C] hover:text-[#171614] hover:scale-105 transition-all duration-200 cursor-pointer select-none"
                >
                  {category}
                </span>
              ))}
            </div>

            {/* Vertical Index: 01 | 02 03 04 */}
            <div className="flex flex-col items-center space-y-3 select-none">
              <span className="text-xs font-bold text-[#171614] tracking-widest">01</span>
              <span className="w-[1.5px] h-12 bg-[#171614]" />
              <span className="text-xs font-light text-[#9E9589] tracking-widest">02</span>
              <span className="text-xs font-light text-[#9E9589] tracking-widest">03</span>
              <span className="text-xs font-light text-[#9E9589] tracking-widest">04</span>
            </div>
          </div>

        </div>
      </div>

      {/* Elegant Curved Wave Arch Transition Divider to Dark Cinematic Section */}
      <div className="absolute bottom-0 inset-x-0 w-full overflow-hidden leading-none z-10 pointer-events-none">
        <div className="w-full h-12 sm:h-16 bg-gradient-to-b from-transparent to-[#0D0D0B]/40 absolute bottom-0 inset-x-0 z-0" />
        <svg
          className="relative block w-full h-14 sm:h-24 lg:h-28 text-[#0D0D0B]"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 1440 120"
        >
          <path d="M0,60 Q720,0 1440,60 L1440,120 L0,120 Z" fill="currentColor" />
          <path d="M0,60 Q720,0 1440,60" opacity="0.4" stroke="#B68A55" strokeWidth="1.5" />
        </svg>
      </div>
    </section>
  );
};
