import React from 'react';
import { Instagram, Youtube, Facebook, ArrowUp } from 'lucide-react';
import { DecodingMomentsLogo } from './DecodingMomentsLogo';

interface MainFooterProps {
  socialLinks?: { platform: string; url: string; iconName: string }[];
  copyrightYear?: string;
  section?: Record<string, string>;
}

const iconMap: Record<string, React.ElementType> = {
  instagram: Instagram,
  youtube: Youtube,
  facebook: Facebook,
};

export const MainFooter: React.FC<MainFooterProps> = ({
  socialLinks: propSocialLinks,
  copyrightYear,
  section,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Dynamic year: prefer CMS value, otherwise always use the current year
  const currentYear = new Date().getFullYear().toString();
  const effectiveYear = copyrightYear?.trim() ? copyrightYear : currentYear;

  const tagline = section?.tagline || 'Turning Moments Into Memories';
  const copyrightText = (section?.copyright || '© {year} Decoding Moments. All rights reserved.')
    .replace('{year}', effectiveYear)
    .replace('Decoding Moments Studio', 'Decoding Moments');

  return (
    <footer className="relative overflow-hidden bg-[#0d1f1a] text-[#EDE6D6] border-t border-[#B68A55]/25 py-6 sm:py-8 lg:py-10">
      {/* attractive top glow + gold hairline */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#B68A55] to-transparent" />
      <div aria-hidden="true" className="pointer-events-none absolute -top-24 left-1/2 h-48 w-[42rem] -translate-x-1/2 rounded-full bg-[#B68A55]/10 blur-3xl" />
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Top Row: Monogram & Socials */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6 pb-5 sm:pb-6 lg:pb-8 border-b border-[#1a3a2e]">
          {/* Monogram & Title with authentic DM + Suitcase SVG */}
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 flex items-center justify-center rounded-sm border border-[#B68A55]/30 bg-[#0a2a1f] p-1 shadow-[0_0_15px_rgba(182,138,85,0.15)]">
              <DecodingMomentsLogo variant="monogram" className="w-full h-full" colorMode="gold" />
            </div>
            <div>
              <p className="font-serif text-lg tracking-luxury text-white font-bold uppercase leading-none drop-shadow-[0_1px_6px_rgba(255,255,255,0.12)]">
                {section?.brand_name || 'DECODING MOMENTS'}
              </p>
              <p className="text-[8px] uppercase tracking-[0.25em] text-[#D8CDB8] mt-1 font-medium">
                {section?.brand_subtitle || 'CONTENT CREATION STUDIO'}
              </p>
            </div>
          </div>

          {/* Social Icons & Back to top */}
          <div className="flex items-center space-x-3">
            {(propSocialLinks && propSocialLinks.length > 0
              ? propSocialLinks
              : [
                  { platform: 'Instagram', url: 'https://instagram.com/decoding.moments', iconName: 'instagram' },
                  { platform: 'YouTube', url: 'https://youtube.com/@DecodingMoments', iconName: 'youtube' },
                  { platform: 'Facebook', url: 'https://facebook.com/DecodingMoments', iconName: 'facebook' },
                ]
            ).map((link) => {
              const Icon = iconMap[link.iconName] || Instagram;
              return (
                <a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.platform}
                  className="w-9 h-9 rounded-full border border-white/20 bg-white/[0.03] text-white/80 flex items-center justify-center hover:border-[#E9C98A] hover:text-white hover:bg-white/10 hover:shadow-[0_0_12px_rgba(233,201,138,0.35)] transition-all"
                >
                  <Icon className="w-4 h-4" />
                </a>
              );
            })}
            <button
              onClick={scrollToTop}
              aria-label="Back to top"
              className="w-9 h-9 rounded-full border border-white/20 bg-white/[0.03] flex items-center justify-center hover:border-[#E9C98A] hover:text-white hover:bg-white/10 hover:shadow-[0_0_12px_rgba(233,201,138,0.35)] transition-all text-white/80"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bottom Row: Copyright & Tagline */}
        <div className="relative pt-4 sm:pt-5 flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-3 text-[11px] sm:text-xs tracking-[0.14em]">
          <p className="font-serif italic text-sm sm:text-[15px] tracking-wide text-white drop-shadow-[0_1px_8px_rgba(255,255,255,0.15)]">
            <span className="mr-2 inline-block text-[#E9C98A]">✦</span>
            {tagline}
            <span className="ml-2 inline-block text-[#E9C98A]">✦</span>
          </p>
          <p className="font-medium uppercase text-white/85">
            {copyrightText}
          </p>
        </div>
      </div>
    </footer>
  );
};
