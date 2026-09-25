import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { DecodingMomentsLogo } from './DecodingMomentsLogo';

interface HeaderProps {
  onOpenBooking: () => void;
  section?: Record<string, string>;
}

export const Header: React.FC<HeaderProps> = ({ onOpenBooking, section }) => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="sticky top-0 inset-x-0 z-50 lg:hidden bg-[#F5EFE6]/95 backdrop-blur-md border-b border-[#E8DFC0]/70 shadow-sm">
      {/* Scroll Progress Bar */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-transparent overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-[#A67C4E] via-[#B68A55] to-[#E8D5B5]"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 h-16 sm:h-20 lg:h-24 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#home" className="flex items-center">
          <div className="w-24 sm:w-32 lg:w-40 h-16 sm:h-20 lg:h-24 flex items-center">
            <DecodingMomentsLogo variant="full" className="w-full h-full" colorMode="gold" />
          </div>
        </a>

        {/* CTA Button */}
        <button
          onClick={onOpenBooking}
          className="inline-flex items-center space-x-2 px-5 py-2.5 sm:px-6 sm:py-3 bg-[#A67C4E] hover:bg-[#8F663B] text-white text-xs font-medium tracking-[0.16em] uppercase rounded-sm shadow-sm transition-all duration-300 hover:shadow-md active:scale-95 cursor-pointer"
        >
          <span>{section?.cta_label || 'PLAN YOUR STORY'}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </header>
  );
};
