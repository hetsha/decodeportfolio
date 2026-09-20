import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

import { HandDrawnLogoSvg } from './HandDrawnLogoSvg';

interface LogoIntroOverlayProps {
  onComplete: () => void;
  isOpen: boolean;
}

export const LogoIntroOverlay: React.FC<LogoIntroOverlayProps> = ({ onComplete, isOpen }) => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    // If untouched, automatically trigger the curtain reveal after a luxurious 2.2s showcase
    const autoExitTimer = setTimeout(() => {
      handleTriggerExit();
    }, 7600);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'Enter' || e.code === 'Escape' || e.code === 'ArrowDown') {
        handleTriggerExit();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(autoExitTimer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleTriggerExit = () => {
    if (isExiting) return;
    setIsExiting(true);
    // Curtain parting duration is 1.1s
    setTimeout(() => {
      onComplete();
    }, 1100);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div
        id="logo-intro-stage"
        className="fixed inset-0 z-50 overflow-hidden select-none"
        onClick={handleTriggerExit}
      >
        {/* CSS Animation Keyframes for Stroke Mask Drawing & Gold Specular Effects */}
        <style dangerouslySetInnerHTML={{ __html: `
          .intro-anim-path {
            fill: none;
            stroke-linecap: round;
            stroke-linejoin: round;
            stroke-dasharray: 1;
            stroke-dashoffset: 1;
            pathLength: 1;
            animation: introRevealPath var(--d) linear var(--delay) forwards;
          }

          @keyframes introRevealPath {
            to { stroke-dashoffset: 0; }
          }

          mask .intro-anim-path {
            stroke: white;
          }

          #introDmMonogram {
            mask: url(#intro_mask_dm);
            -webkit-mask: url(#intro_mask_dm);
          }
          #introSuitcaseGroup {
            mask: url(#intro_mask_suitcase);
            -webkit-mask: url(#intro_mask_suitcase);
          }
          #introDecodingGroup {
            mask: url(#intro_mask_decoding);
            -webkit-mask: url(#intro_mask_decoding);
          }
          #introMomentsGroup {
            mask: url(#intro_mask_moments);
            -webkit-mask: url(#intro_mask_moments);
          }
          #introLinesGroup {
            mask: url(#intro_mask_lines);
            -webkit-mask: url(#intro_mask_lines);
          }


        ` }} />

        {/* =========================================================================
            TOP THEATER CURTAIN (Slides UP to -100% on exit)
           ========================================================================= */}
        <motion.div
          id="curtain-top-panel"
          initial={{ y: '0%' }}
          animate={{ y: isExiting ? '-100%' : '0%' }}
          transition={{ duration: 1.1, ease: [0.77, 0, 0.175, 1] }}
          className="absolute top-0 left-0 right-0 h-1/2 bg-[#050504] z-20 overflow-hidden"
        >
          {/* Ambient Warm Golden Depth */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,rgba(210,164,74,0.14),transparent_60%)]" />
          
          {/* Golden Hem Seam: ONLY visible during exit separation */}
          {isExiting && (
            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#F0C45B] to-transparent shadow-[0_0_20px_rgba(240,196,91,0.8)] opacity-80" />
          )}
        </motion.div>

        {/* =========================================================================
            BOTTOM THEATER CURTAIN (Slides DOWN to +100% on exit)
           ========================================================================= */}
        <motion.div
          id="curtain-bottom-panel"
          initial={{ y: '0%' }}
          animate={{ y: isExiting ? '100%' : '0%' }}
          transition={{ duration: 1.1, ease: [0.77, 0, 0.175, 1] }}
          className="absolute bottom-0 left-0 right-0 h-1/2 bg-[#050504] z-20 overflow-hidden"
        >
          {/* Ambient Warm Golden Depth */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(210,164,74,0.14),transparent_60%)]" />
          
          {/* Golden Hem Seam: ONLY visible during exit separation */}
          {isExiting && (
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#F0C45B] to-transparent shadow-[0_0_20px_rgba(240,196,91,0.8)] opacity-80" />
          )}
        </motion.div>

        {/* =========================================================================
            THE HORIZON LASER BEAM (Flares only when curtains actually part on exit)
           ========================================================================= */}
        {isExiting && (
          <motion.div
            id="curtain-horizon-beam"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{
              scaleX: [0, 1.2, 0.8],
              opacity: [1, 0.9, 0],
            }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-[3px] bg-gradient-to-r from-transparent via-[#FFF6DE] via-[#F0C45B] to-transparent z-40 pointer-events-none shadow-[0_0_35px_rgba(240,196,91,0.9)]"
          />
        )}

        {/* =========================================================================
            CENTRAL STAGE: LOGO + INTERACTIVE GOLDEN LINE & ARROW PROMPT
           ========================================================================= */}
        <motion.div
          id="intro-center-stage"
          initial={{ opacity: 1 }}
          animate={{
            opacity: isExiting ? 0 : 1,
            scale: isExiting ? 1.06 : 1,
            filter: isExiting ? 'blur(8px)' : 'blur(0px)',
          }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="relative z-30 flex flex-col items-center justify-center w-full h-full cursor-pointer px-4"
        >
          {/* Logo Container */}
          <div className="relative w-[min(76vw,660px)] aspect-square flex-shrink-0 flex items-center justify-center p-2 sm:p-4 overflow-hidden">
            {/* Hand-Drawn Vector SVG (Exact Geometry & Masks) */}
            <HandDrawnLogoSvg />
          </div>


        </motion.div>
      </div>
    </AnimatePresence>
  );
};
