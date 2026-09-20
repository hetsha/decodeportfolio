import React from 'react';
import { Instagram, Youtube, Facebook, ArrowUp } from 'lucide-react';
import { DecodingMomentsLogo } from './DecodingMomentsLogo';

export const MainFooter: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#080807] text-[#8C8477] border-t border-[#1F1D19] py-16">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Top Row: Monogram, Nav & Socials */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-12 border-b border-[#1A1916]">
          {/* Monogram & Title with authentic DM + Suitcase SVG */}
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 flex items-center justify-center rounded-sm border border-[#B68A55]/30 bg-[#12110E] p-1 shadow-[0_0_15px_rgba(182,138,85,0.15)]">
              <DecodingMomentsLogo variant="monogram" className="w-full h-full" colorMode="gold" />
            </div>
            <div>
              <p className="font-serif text-lg tracking-luxury text-[#FAF6F0] font-bold uppercase leading-none">
                DECODING MOMENTS
              </p>
              <p className="text-[8px] uppercase tracking-[0.25em] text-[#A69986] mt-1 font-medium">
                CONTENT CREATION STUDIO
              </p>
            </div>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap justify-center gap-6 sm:gap-8 text-xs uppercase tracking-luxury font-medium">
            <a href="#home" className="hover:text-white transition-colors">
              Home
            </a>
            <a href="#work" className="hover:text-white transition-colors">
              Work
            </a>
            <a href="#services" className="hover:text-white transition-colors">
              Services
            </a>
            <a href="#instant-reels" className="hover:text-white transition-colors">
              Instant Reels
            </a>
            <a href="#about" className="hover:text-white transition-colors">
              About
            </a>
            <a href="#contact" className="hover:text-white transition-colors">
              Contact
            </a>
          </nav>

          {/* Social Icons & Back to top */}
          <div className="flex items-center space-x-3">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-9 h-9 rounded-full border border-[#2B2822] flex items-center justify-center hover:border-[#B68A55] hover:text-white transition-colors"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="w-9 h-9 rounded-full border border-[#2B2822] flex items-center justify-center hover:border-[#B68A55] hover:text-white transition-colors"
            >
              <Youtube className="w-4 h-4" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="w-9 h-9 rounded-full border border-[#2B2822] flex items-center justify-center hover:border-[#B68A55] hover:text-white transition-colors"
            >
              <Facebook className="w-4 h-4" />
            </a>
            <button
              onClick={scrollToTop}
              aria-label="Back to top"
              className="w-9 h-9 rounded-full border border-[#2B2822] flex items-center justify-center hover:border-[#B68A55] hover:text-white transition-colors text-stone-400"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Central Full Logo Emblem as featured on dark backdrop */}
        <div className="py-12 flex flex-col items-center justify-center border-b border-[#1A1916]">
          <div className="w-full max-w-[280px] sm:max-w-[320px]">
            <DecodingMomentsLogo variant="full" colorMode="gold" glow={true} className="w-full h-auto" />
          </div>
        </div>

        {/* Bottom Row: Copyright & Tagline */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#666056] tracking-wider gap-4">
          <p>Turning Moments Into Memories</p>
          <p>© 2024 Decoding Moments Studio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
