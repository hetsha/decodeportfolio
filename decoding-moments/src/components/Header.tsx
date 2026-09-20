import React, { useState } from 'react';
import { ArrowRight, Menu, X, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { DecodingMomentsLogo } from './DecodingMomentsLogo';

interface HeaderProps {
  onOpenBooking: () => void;
  onReplayIntro?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenBooking, onReplayIntro }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Track scroll position for header styling
  const [scrollProgress, setScrollProgress] = useState(0);

  React.useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home', active: true },
    { label: 'Work', href: '#work' },
    { label: 'Services', href: '#services' },
    { label: 'Instant Reels', href: '#instant-reels' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#F5EFE6]/95 backdrop-blur-md border-b border-[#E8DFC0]/70 transition-all duration-300">
      {/* Dynamic Scroll Progress Bar */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-transparent overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-[#A67C4E] via-[#B68A55] to-[#E8D5B5]"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 h-20 sm:h-24 flex items-center justify-between">
        {/* Brand Logo & Monogram with authentic DM + Suitcase SVG */}
        <a href="#home" className="flex items-center space-x-3.5 group">
          <div className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center rounded-sm border border-[#B68A55]/40 bg-[#FAF6F0] shadow-sm p-1 group-hover:border-[#B68A55] group-hover:shadow-[0_0_12px_rgba(182,138,85,0.3)] transition-all duration-300">
            <DecodingMomentsLogo variant="monogram" className="w-full h-full" colorMode="gold" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-lg sm:text-xl font-bold tracking-[0.18em] text-[#171614] leading-none uppercase">
              DECODING MOMENTS
            </span>
            <span className="text-[9px] uppercase tracking-[0.25em] text-[#7A756D] mt-1 font-medium">
              CONTENT CREATION STUDIO
            </span>
          </div>
        </a>

        {/* Primary Navigation Links */}
        <nav className="hidden md:flex items-center space-x-8 text-xs font-semibold uppercase tracking-[0.18em] text-[#4A453E]">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`transition-colors duration-200 ${
                link.active
                  ? 'text-[#171614] relative after:content-[\'\'] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[1.5px] after:bg-[#B68A55]'
                  : 'hover:text-[#171614]'
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action Button & Replay Intro Trigger */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          {onReplayIntro && (
            <button
              onClick={onReplayIntro}
              title="Watch Opening Logo Animation"
              className="hidden lg:inline-flex items-center space-x-1.5 px-3 py-2 border border-[#B68A55]/40 hover:border-[#B68A55] bg-[#FAF6F0] rounded-sm text-[10px] tracking-[0.18em] uppercase text-[#7A756D] hover:text-[#171614] transition-all cursor-pointer shadow-2xs group"
            >
              <Sparkles className="w-3 h-3 text-[#B68A55] group-hover:rotate-12 transition-transform" />
              <span>LOGO STORY</span>
            </button>
          )}

          <button
            onClick={onOpenBooking}
            className="inline-flex items-center space-x-2 px-5 py-2.5 sm:px-6 sm:py-3 bg-[#A67C4E] hover:bg-[#8F663B] text-white text-xs font-medium tracking-[0.16em] uppercase rounded-sm shadow-sm transition-all duration-300 hover:shadow-md active:scale-95 cursor-pointer"
          >
            <span>PLAN YOUR STORY</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-md text-[#171614] hover:bg-[#E8DFC0]/50 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-[#E8DFC0] bg-[#FAF6F0] px-6 py-6 shadow-xl"
          >
            <nav className="flex flex-col space-y-4 text-xs font-semibold uppercase tracking-luxury text-[#4A453E]">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 hover:text-[#B68A55] border-b border-[#E8DFC0]/40 transition-colors flex justify-between items-center"
                >
                  <span>{link.label}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#B68A55]" />
                </a>
              ))}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full mt-4 py-3 bg-[#171614] text-white text-center text-xs tracking-luxury uppercase rounded-sm font-semibold"
              >
                Start Story Consultation
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
