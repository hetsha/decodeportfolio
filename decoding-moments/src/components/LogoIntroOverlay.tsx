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

    const autoExitTimer = setTimeout(() => {
      handleTriggerExit();
    }, 2000);

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
    setTimeout(() => {
      onComplete();
    }, 800);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="logo-intro"
          id="logo-intro-stage"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
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
              animation: introRevealPath calc(var(--d) * 0.6) linear calc(var(--delay) * 0.6) forwards;
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
            #introLinesGroup {
              mask: url(#intro_mask_lines);
              -webkit-mask: url(#intro_mask_lines);
            }

            #introDecodingGroup,
            #introMomentsGroup {
              opacity: 0;
              animation: introFadeIn 0.6s ease-out forwards;
            }
            #introDecodingGroup { animation-delay: 1.3s; }
            #introMomentsGroup { animation-delay: 1.3s; }

            @keyframes introFadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }


          ` }} />

          <motion.div
            id="curtain-top-panel"
            initial={{ y: '0%' }}
            animate={{ y: isExiting ? '-100%' : '0%' }}
            transition={{ duration: 0.6, ease: [0.77, 0, 0.175, 1] }}
            className="absolute top-0 left-0 right-0 h-1/2 bg-[#0d1f1a] z-20 overflow-hidden"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,rgba(210,164,74,0.14),transparent_60%)]" />
            {isExiting && (
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#F0C45B] to-transparent shadow-[0_0_20px_rgba(240,196,91,0.8)] opacity-80" />
            )}
          </motion.div>

          <motion.div
            id="curtain-bottom-panel"
            initial={{ y: '0%' }}
            animate={{ y: isExiting ? '100%' : '0%' }}
            transition={{ duration: 0.6, ease: [0.77, 0, 0.175, 1] }}
            className="absolute bottom-0 left-0 right-0 h-1/2 bg-[#0d1f1a] z-20 overflow-hidden"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(210,164,74,0.14),transparent_60%)]" />
            {isExiting && (
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#F0C45B] to-transparent shadow-[0_0_20px_rgba(240,196,91,0.8)] opacity-80" />
            )}
          </motion.div>

          {isExiting && (
            <motion.div
              id="curtain-horizon-beam"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{
                scaleX: [0, 1.2, 0.8],
                opacity: [1, 0.9, 0],
              }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-[3px] bg-gradient-to-r from-transparent via-[#FFF6DE] via-[#F0C45B] to-transparent z-40 pointer-events-none shadow-[0_0_35px_rgba(240,196,91,0.9)]"
            />
          )}

          <motion.div
            id="intro-center-stage"
            initial={{ opacity: 1 }}
            animate={{
              opacity: isExiting ? 0 : 1,
              scale: isExiting ? 1.06 : 1,
              filter: isExiting ? 'blur(8px)' : 'blur(0px)',
            }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="relative z-30 flex flex-col items-center justify-center w-full h-full cursor-pointer px-4"
          >
            <div className="relative w-[min(76vw,660px)] aspect-square flex-shrink-0 flex items-center justify-center p-2 sm:p-4 overflow-hidden">
              <HandDrawnLogoSvg />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
