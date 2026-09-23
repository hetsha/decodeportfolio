import React, { useState, useEffect, useRef } from 'react';
import { ArrowUpRight, Volume2, VolumeX, Play, ChevronLeft, ChevronRight, Instagram } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ReelItem } from '../types';
import { IndianLotusBotanicalSvg, IndianArchSvg } from './IndianMotifs';

interface HeroSectionProps {
  onSelectReel: (reel: ReelItem) => void;
  onFilterCategory?: (cat: string) => void;
  introComplete?: boolean;
  reels?: ReelItem[];
  section?: Record<string, string>;
  categories?: string[];
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onSelectReel, onFilterCategory, introComplete = true, reels: propReels, section, categories: propCategories }) => {
  const [activeReelIndex, setActiveReelIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [clientCount, setClientCount] = useState(420);
  const [typedText, setTypedText] = useState('');
  const [typedSubtext, setTypedSubtext] = useState('');
  const [isTypingDone, setIsTypingDone] = useState(false);
  const [blurAmount, setBlurAmount] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const HERO_REELS_DATA = propReels && propReels.length > 0 ? propReels : [];

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const line1 = (section?.typing_lines || 'More than memories.|Stories that live on.').split('|')[0] || 'More than memories.';
  const line2 = (section?.typing_lines || 'More than memories.|Stories that live on.').split('|')[1] || 'Stories that live on.';

  useEffect(() => {
    if (!introComplete) return;
    let charIndex = 0;
    let currentLine = 0;
    const texts = [line1, line2];
    const setters = [setTypedText, setTypedSubtext];
    const typeTimer = setInterval(() => {
      if (currentLine >= texts.length) {
        clearInterval(typeTimer);
        setIsTypingDone(true);
        return;
      }
      const text = texts[currentLine];
      if (charIndex <= text.length) {
        setters[currentLine](text.slice(0, charIndex));
        charIndex++;
      } else {
        currentLine++;
        charIndex = 0;
      }
    }, 55);
    return () => clearInterval(typeTimer);
  }, [introComplete]);

  useEffect(() => {
    if (HERO_REELS_DATA.length === 0) return;
    const swapTimer = setInterval(() => {
      setDirection(1);
      setActiveReelIndex((prev) => (prev + 1) % HERO_REELS_DATA.length);
    }, 4000);
    return () => clearInterval(swapTimer);
  }, [HERO_REELS_DATA.length]);

  useEffect(() => {
    const timer = setInterval(() => {
      setClientCount((prev) => {
        if (prev >= 500) { clearInterval(timer); return 500; }
        return prev + 4;
      });
    }, 40);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const heroHeight = sectionRef.current.offsetHeight;
      const scrollY = window.scrollY;
      const scrollProgress = Math.max(0, Math.min(1, scrollY / heroHeight));
      setBlurAmount(scrollProgress * 12);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const categories = propCategories && propCategories.length > 0
    ? propCategories
    : HERO_REELS_DATA.length > 0
      ? [...new Set(HERO_REELS_DATA.map((r) => r.category).filter(Boolean))]
      : (section?.categories || '').split('|').map((s) => s.trim()).filter(Boolean);

  if (HERO_REELS_DATA.length === 0) {
    return <section className="sticky top-0 h-[100dvh] min-h-[600px] bg-[#F5EFE6] flex items-center justify-center" id="home">
      <div className="text-[#7A756D] text-sm animate-pulse">Loading reels...</div>
    </section>;
  }

  const len = HERO_REELS_DATA.length;
  const safeIndex = Number.isFinite(activeReelIndex) ? ((activeReelIndex % len) + len) % len : 0;

  const getReelAt = (offset: number) => HERO_REELS_DATA[(safeIndex + offset + len) % len];
  const leftReel = getReelAt(-1);
  const centerReel = getReelAt(0);
  const rightReel = getReelAt(1);
  const activeCategory = centerReel.category;

  const goNext = () => {
    setDirection(1);
    setActiveReelIndex((p) => (p + 1) % len);
  };
  const goPrev = () => {
    setDirection(-1);
    setActiveReelIndex((p) => (p - 1 + len) % len);
  };

  const renderCard = (reel: ReelItem, isCenter: boolean) => (
    <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl w-[240px] sm:w-52 lg:w-56 h-[426px] sm:h-[52vh] lg:h-[56vh] min-h-[240px] max-h-[440px] shadow-2xl border-2 border-white/50 bg-[#201A15]">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${reel.posterUrl}')` }} />
      <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-black/85 pointer-events-none" />
      <div className="absolute top-3 sm:top-4 inset-x-3 sm:inset-x-4 flex justify-between items-center text-white/90 text-xs z-20">
        <span className="text-[9px] sm:text-[10px] uppercase font-semibold tracking-widest bg-black/40 backdrop-blur-sm px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full border border-white/20">{reel.badge}</span>
        <div className="flex items-center gap-1.5">
          {reel.instagramUrl && (
            <a
              href={reel.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="p-1 rounded-full bg-black/30 hover:bg-[#E1306C]/60 backdrop-blur-sm text-white transition-colors"
              aria-label="View on Instagram"
            >
              <Instagram className="w-3.5 h-3.5" />
            </a>
          )}
          <button type="button" onClick={(e) => { e.stopPropagation(); setIsAudioMuted(!isAudioMuted); }} className="p-1 rounded-full bg-black/30 hover:bg-black/60 backdrop-blur-sm text-white transition-colors" aria-label="Toggle sound">
            {isAudioMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>
      <div className="absolute inset-0 flex items-center justify-center z-20">
        <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-white/25 backdrop-blur-md border border-white/60 flex items-center justify-center text-white shadow-xl">
          <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-white text-white ml-0.5" />
        </div>
      </div>
      <div className="absolute bottom-4 sm:bottom-5 inset-x-4 sm:inset-x-5 text-white z-20">
        <p className="font-script-accent text-xl sm:text-2xl text-[#FFDE99] drop-shadow-sm leading-tight">{reel.title}</p>
        <div className="flex items-center justify-between text-[11px] text-stone-200 mt-1">
          <span className="tracking-wider uppercase font-medium">Real Moments</span>
          <span className="text-[10px] opacity-75">{reel.duration}</span>
        </div>
      </div>
    </div>
  );

  return (
    <section ref={sectionRef} className="sticky top-0 h-[100dvh] min-h-[600px] max-h-[1200px] flex flex-col justify-center paper-texture z-10" id="home" style={{ filter: blurAmount > 0 ? `blur(${blurAmount}px)` : 'none', transition: 'filter 0.15s ease-out' }}>
      <motion.div initial={{ opacity: 0 }} animate={introComplete ? { opacity: 0.45 } : { opacity: 0 }} transition={{ duration: 1.4, ease: 'easeOut', delay: 0.2 }}
        className="absolute top-[30%] sm:top-[40%] -left-14 sm:-left-14 w-40 sm:w-80 lg:w-96 h-[300px] sm:h-[600px] lg:h-[700px] pointer-events-none mix-blend-multiply z-0 select-none">
        <IndianArchSvg draw={introComplete} color="#A67C4E" className="w-full h-full opacity-80" />
      </motion.div>
      <motion.div initial={{ opacity: 0 }} animate={introComplete ? { opacity: 0.45 } : { opacity: 0 }} transition={{ duration: 1.4, ease: 'easeOut', delay: 0.3 }}
        className="absolute -top-6 -right-16 sm:-right-8 w-60 sm:w-72 lg:w-80 h-auto pointer-events-none mix-blend-multiply z-0 select-none">
        <IndianLotusBotanicalSvg draw={introComplete} color="#B68A55" className="w-full h-full" />
      </motion.div>
      <div className="absolute top-1/3 left-1/4 w-2 h-2 rounded-full bg-[#B68A55]/40 blur-xs pointer-events-none animate-pulse" />
      <div className="absolute top-1/2 right-1/3 w-3 h-3 rounded-full bg-[#B68A55]/30 blur-xs pointer-events-none animate-pulse" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative w-full h-full flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-4 items-center w-full">

          {/* Left: Text */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-3 sm:space-y-5 lg:space-y-6 z-10 h-full py-4">
            <div className="flex items-center space-x-2.5">
              <div className="flex items-center space-x-2.5 text-[10px] sm:text-xs tracking-ultra uppercase text-[#7A756D] font-medium">
                {(section?.tagline_words || 'CAPTURE|CREATE|RELIVE').split('|').map((w, i) => (
                  <React.Fragment key={w}>
                    {i > 0 && <span className="text-[#B68A55]">×</span>}
                    <span>{w}</span>
                  </React.Fragment>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="absolute -left-5 top-2 bottom-2 w-[1.5px] bg-gradient-to-b from-[#B68A55] via-[#E8DFC0] to-transparent hidden sm:block" />
              <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal leading-[0.95] tracking-tight text-[#171614]">
                {(section?.headline_line1 || 'DECODING')}<br /><span className="italic font-normal">{(section?.headline_line2 || 'MOMENTS')}</span>
              </h1>
            </div>
            <p className="text-base sm:text-lg text-[#5A554E] font-light max-w-sm leading-relaxed">{section?.description || 'Every moment has a story. We make sure it lives forever.'}</p>
            <div className="pt-2 flex flex-wrap items-center gap-4 sm:gap-6">
              <a href="#work" className="inline-flex items-center space-x-3 group cursor-pointer">
                <span className="w-11 h-11 rounded-full bg-[#171614] text-white flex items-center justify-center group-hover:bg-[#A67C4E] transition-colors duration-300 shadow-md"><ArrowUpRight className="w-4 h-4" /></span>
                <span className="text-xs font-semibold uppercase tracking-luxury text-[#171614] group-hover:text-[#A67C4E] transition-colors duration-300">{section?.cta_label || 'EXPLORE OUR WORK'}</span>
              </a>
            </div>
            <div className="pt-4 sm:pt-6 lg:pt-8 flex items-center space-x-3 sm:space-x-4 border-t border-[#E3D7C7]/80">
              <div className="flex -space-x-3">
                <div className="w-10 h-10 rounded-full border-2 border-[#F5EFE6] bg-[#2E2820] flex items-center justify-center text-white text-[11px] font-semibold shadow-sm">SK</div>
                <div className="w-10 h-10 rounded-full border-2 border-[#F5EFE6] bg-[#594833] flex items-center justify-center text-white text-[11px] font-semibold shadow-sm">AR</div>
                <div className="w-10 h-10 rounded-full border-2 border-[#F5EFE6] bg-[#826E52] flex items-center justify-center text-white text-[11px] font-semibold shadow-sm">MV</div>
              </div>
              <div>
                <p className="text-base font-bold text-[#171614] leading-tight font-mono">{clientCount}+</p>
                <p className="text-[11px] uppercase tracking-wider text-[#7A756D]">Happy Clients</p>
              </div>
            </div>
          </div>

          {/* Center: Cards */}
          <div className="lg:col-span-5 relative flex justify-center items-center py-2 sm:py-4 lg:py-6 h-full">
            {/* Typing text */}
            <div className="absolute -top-4 sm:-top-6 left-2 sm:left-6 z-30 pointer-events-none">
              <p className="font-script-accent text-xl sm:text-2xl lg:text-3xl text-[#8E785C] leading-none select-none rotate-[-6deg]">
                {typedText}<span className={!isTypingDone ? 'animate-pulse' : 'hidden'}>|</span><br />
                <span className="text-base sm:text-xl lg:text-2xl text-[#6B5A44]">{typedSubtext}</span>
              </p>
            </div>

            {/* Mobile: Single card with AnimatePresence */}
            {isMobile ? (
              <div className="relative w-full flex flex-col items-center justify-center">
                <div className="relative w-[240px] h-[340px] min-h-[240px] max-h-[400px] flex items-center justify-center overflow-visible">
                  <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                      key={`mobile-${centerReel.id}`}
                      custom={direction}
                      variants={{
                        enter: (d: number) => ({ x: d > 0 ? 300 : -300, opacity: 0 }),
                        center: { x: 0, opacity: 1 },
                        exit: (d: number) => ({ x: d > 0 ? -300 : 300, opacity: 0 }),
                      }}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                      className="cursor-pointer absolute inset-0"
                      onClick={() => onSelectReel(centerReel)}
                    >
                      {renderCard(centerReel, true)}
                    </motion.div>
                  </AnimatePresence>
                </div>
                {/* Mobile Navigation */}
                <div className="flex items-center gap-4 mt-4 z-30">
                  <button onClick={goPrev} className="w-8 h-8 rounded-full border border-[#B68A55]/40 flex items-center justify-center text-[#8E785C] hover:bg-[#B68A55]/10 transition-colors">
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <div className="flex items-center gap-2">
                    {HERO_REELS_DATA.map((_, i) => (
                      <button key={i} onClick={() => { setDirection(i > activeReelIndex ? 1 : -1); setActiveReelIndex(i); }}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${i === activeReelIndex ? 'bg-[#171614] scale-125' : 'bg-[#B68A55]/30 hover:bg-[#B68A55]/60'}`} />
                    ))}
                  </div>
                  <button onClick={goNext} className="w-8 h-8 rounded-full border border-[#B68A55]/40 flex items-center justify-center text-[#8E785C] hover:bg-[#B68A55]/10 transition-colors">
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              /* Desktop: 3-card carousel */
              <div className="relative w-full max-w-[480px] h-[62vh] lg:h-[66vh] min-h-[340px] max-h-[560px] flex items-center justify-center">
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-[360px] h-[360px] lg:w-[420px] lg:h-[420px] rounded-full bg-[radial-gradient(circle_at_center,rgba(212,143,41,0.15)_0%,rgba(182,138,85,0.06)_50%,transparent_70%)]" />
                </div>
                {[
                  { reel: leftReel, slot: 'left' as const, x: -140, rotate: -8, opacity: 0.75, zIndex: 0 },
                  { reel: centerReel, slot: 'center' as const, x: 0, rotate: 0, opacity: 1, zIndex: 10 },
                  { reel: rightReel, slot: 'right' as const, x: 140, rotate: 8, opacity: 0.75, zIndex: 0 },
                ].map(({ reel, slot, x, rotate, opacity, zIndex }) => (
                  <motion.div
                    key={`card-${reel.id}`}
                    animate={{ x, rotate, opacity }}
                    transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                    className="absolute cursor-pointer"
                    style={{ zIndex }}
                    onClick={slot === 'center' ? () => onSelectReel(reel) : slot === 'left' ? goPrev : goNext}
                  >
                    {renderCard(reel, slot === 'center')}
                  </motion.div>
                ))}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex items-center gap-4 z-30">
                  <button onClick={goPrev} className="w-8 h-8 rounded-full border border-[#B68A55]/40 flex items-center justify-center text-[#8E785C] hover:bg-[#B68A55]/10 transition-colors">
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <div className="flex items-center gap-2">
                    {HERO_REELS_DATA.map((_, i) => (
                      <button key={i} onClick={() => { setDirection(i > activeReelIndex ? 1 : -1); setActiveReelIndex(i); }}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${i === activeReelIndex ? 'bg-[#171614] scale-125' : 'bg-[#B68A55]/30 hover:bg-[#B68A55]/60'}`} />
                    ))}
                  </div>
                  <button onClick={goNext} className="w-8 h-8 rounded-full border border-[#B68A55]/40 flex items-center justify-center text-[#8E785C] hover:bg-[#B68A55]/10 transition-colors">
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right: Categories + Numbers */}
          <div className="lg:col-span-2 flex flex-col items-center lg:items-end justify-center lg:justify-between text-center lg:text-right mt-3 lg:mt-0 lg:h-[56vh] lg:max-h-[520px] lg:pl-6 z-10">
            <div className="flex flex-wrap justify-center lg:justify-end items-center gap-x-4 gap-y-1 lg:gap-y-4">
              {categories.map((category) => (
                <span key={category} onClick={() => onFilterCategory?.(category)}
                  className={`font-script-accent text-lg sm:text-xl lg:text-2xl transition-all duration-300 cursor-pointer select-none ${activeCategory === category ? 'text-[#171614] lg:scale-110 font-medium' : 'text-[#8E785C] hover:text-[#171614]'
                    }`}>{category}</span>
              ))}
            </div>
            <div className="hidden lg:flex items-start gap-3 select-none mt-4 lg:mt-0">
              <div className="flex flex-col items-center">
                {[0, 1, 2, 3].map((i) => (
                  <React.Fragment key={i}>
                    <span className={`text-xs tracking-widest transition-all duration-400 h-5 flex items-center ${i === activeReelIndex ? 'font-bold text-[#171614] text-sm' : 'font-light text-[#9E9589]'
                      }`}>0{i + 1}</span>
                    {i < 3 && <span className={`w-[1px] h-5 transition-colors duration-400 ${i === activeReelIndex ? 'bg-[#171614]' : 'bg-[#D5CFC5]'}`} />}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 sm:bottom-24 lg:bottom-28 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
        <a href="#services" className="flex flex-col items-center space-y-2 text-[#8C8479] hover:text-[#171614] transition-colors pointer-events-auto group cursor-pointer">
          <div className="w-[1px] h-8 bg-gradient-to-b from-transparent via-[#B68A55] to-[#C5BAA8] group-hover:via-[#171614] transition-colors animate-pulse" />
          <span className="text-[10px] uppercase tracking-[0.25em] font-medium">{section?.scroll_label || 'Scroll Down'}</span>
        </a>
      </div>
    </section>
  );
};
