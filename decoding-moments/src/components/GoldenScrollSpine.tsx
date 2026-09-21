import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { DecodingMomentsLogo } from './DecodingMomentsLogo';

interface GoldenScrollSpineProps {
  onReplayIntro: () => void;
}

interface SectionCheckpoint {
  id: string;
  label: string;
  sublabel: string;
}

const CHECKPOINTS: SectionCheckpoint[] = [
  { id: 'home', label: 'Prologue', sublabel: 'Hero Reels' },
  { id: 'about', label: 'Cinema', sublabel: 'The Philosophy' },
  { id: 'services', label: 'Craft', sublabel: 'Our Services' },
  { id: 'work', label: 'Stories', sublabel: 'Curated Chapters' },
  { id: 'instant-reels', label: 'Instant', sublabel: '24hr Delivery' },
  { id: 'contact', label: 'Commission', sublabel: 'Book Dates' },
];

export const GoldenScrollSpine: React.FC<GoldenScrollSpineProps> = ({ onReplayIntro }) => {
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001,
  });

  const [activeSection, setActiveSection] = useState<string>('home');
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleScrollCheck = () => {
      const scrollPosition = window.scrollY + window.innerHeight * 0.35;
      for (let i = CHECKPOINTS.length - 1; i >= 0; i--) {
        const el = document.getElementById(CHECKPOINTS[i].id);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(CHECKPOINTS[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScrollCheck, { passive: true });
    handleScrollCheck();
    return () => window.removeEventListener('scroll', handleScrollCheck);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Desktop Sticky Lateral Golden Thread Spine */}
      <aside
        aria-label="Storyline Navigation Thread"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="hidden xl:flex fixed left-4 2xl:left-8 top-1/2 -translate-y-1/2 z-30 flex-col items-center select-none"
      >
        {/* Top Thread Anchor */}
        <div
          className="w-2 h-2 rounded-full bg-gradient-to-tr from-[#E2B755] to-[#F9E8B2] shadow-[0_0_8px_rgba(226,183,85,0.6)]"
        />

        {/* Vertical Golden Thread Track */}
        <div className="relative w-[2px] h-64 sm:h-72 my-3 bg-[#E8DFC0]/60 rounded-full overflow-hidden">
          {/* Active Liquid Gold Fill */}
          <motion.div
            style={{ scaleY: smoothProgress, originY: 0 }}
            className="absolute top-0 inset-x-0 w-full bg-gradient-to-b from-[#F9E8B2] via-[#E2B755] to-[#B68026] shadow-[0_0_10px_rgba(226,183,85,0.7)]"
          />
        </div>

        {/* Checkpoint Nodes along the Thread */}
        <div className="flex flex-col space-y-3.5">
          {CHECKPOINTS.map((checkpoint) => {
            const isActive = activeSection === checkpoint.id;
            return (
              <button
                key={checkpoint.id}
                onClick={() => scrollTo(checkpoint.id)}
                className="group relative flex items-center justify-center w-5 h-5 focus:outline-none"
              >
                {/* Node Bead */}
                <div
                  className={`transition-all duration-300 rounded-full ${
                    isActive
                      ? 'w-3 h-3 bg-gradient-to-tr from-[#E2B755] to-[#F9E8B2] ring-4 ring-[#B68A55]/20 shadow-[0_0_10px_rgba(226,183,85,0.8)]'
                      : 'w-1.5 h-1.5 bg-[#C5BAA8] group-hover:bg-[#B68A55] group-hover:scale-150'
                  }`}
                />

                {/* Milestone Label Reveal */}
                <div
                  className={`absolute left-full ml-3.5 flex flex-col text-left transition-all duration-300 pointer-events-none whitespace-nowrap ${
                    isActive || isHovered
                      ? 'opacity-100 translate-x-0'
                      : 'opacity-0 -translate-x-2'
                  }`}
                >
                  <span
                    className={`text-[11px] font-serif font-bold tracking-wider uppercase leading-tight ${
                      isActive ? 'text-[#B68A55]' : 'text-[#7A756D] group-hover:text-[#171614]'
                    }`}
                  >
                    {checkpoint.label}
                  </span>
                  <span className="text-[9px] tracking-widest uppercase text-[#9E978C] font-light">
                    {checkpoint.sublabel}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </aside>

    </>
  );
};

/**
 * Recurring DM + Suitcase Section Divider Seal
 * Used across the website between major chapters
 */
export const DecodingMomentsSectionSeal: React.FC<{
  title?: string;
  theme?: 'light' | 'dark';
}> = ({ title, theme = 'light' }) => {
  const isDark = theme === 'dark';
  return (
    <div className="w-full flex flex-col items-center justify-center py-6 select-none relative z-10">
      <div className="w-full max-w-xs sm:max-w-md flex items-center justify-center space-x-4">
        {/* Left stretching gold line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ originX: 1 }}
          className={`h-[1px] flex-1 ${
            isDark
              ? 'bg-gradient-to-l from-[#B68A55] via-[#8C6735] to-transparent'
              : 'bg-gradient-to-l from-[#C5BAA8] via-[#B68A55]/50 to-transparent'
          }`}
        />

        {/* Central Monogram Seal Badge */}
        <motion.div
          whileHover={{ rotate: [0, -5, 5, 0], scale: 1.08 }}
          className={`p-2 rounded-full border shadow-sm flex items-center justify-center ${
            isDark
              ? 'border-[#B68A55]/40 bg-[#171614] shadow-[0_0_15px_rgba(182,138,85,0.2)]'
              : 'border-[#B68A55]/30 bg-[#FAF6F0] shadow-sm'
          }`}
        >
          <div className="w-8 h-8">
            <DecodingMomentsLogo
              variant="monogram"
              className="w-full h-full"
              colorMode={isDark ? 'gold' : 'gold'}
            />
          </div>
        </motion.div>

        {/* Right stretching gold line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ originX: 0 }}
          className={`h-[1px] flex-1 ${
            isDark
              ? 'bg-gradient-to-r from-[#B68A55] via-[#8C6735] to-transparent'
              : 'bg-gradient-to-r from-[#C5BAA8] via-[#B68A55]/50 to-transparent'
          }`}
        />
      </div>

      {title && (
        <span
          className={`mt-2 font-serif text-[11px] tracking-[0.3em] uppercase ${
            isDark ? 'text-[#A69986]' : 'text-[#8C8479]'
          }`}
        >
          {title}
        </span>
      )}
    </div>
  );
};
