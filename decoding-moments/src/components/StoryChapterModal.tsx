import React from 'react';
import { X, MapPin, Calendar, Camera, ArrowRight, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { StoryChapter } from '../types';

interface StoryChapterModalProps {
  chapter: StoryChapter | null;
  onClose: () => void;
  onOpenBooking: () => void;
}

export const StoryChapterModal: React.FC<StoryChapterModalProps> = ({
  chapter,
  onClose,
  onOpenBooking,
}) => {
  if (!chapter) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 sm:p-6 overflow-y-auto">
        <div className="fixed inset-0" onClick={onClose} />

        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-3xl bg-[#FAF6F0] border border-[#D5C8B7] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl z-10 my-4 sm:my-8 max-h-[90vh] flex flex-col"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/40 hover:bg-black/70 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Hero Image Banner */}
          <div className="relative w-full h-48 sm:h-64 lg:h-80 overflow-hidden bg-stone-900">
            <img
              src={chapter.imageUrl}
              alt={chapter.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#FAF6F0] via-black/30 to-black/60" />

            <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 text-[#171614]">
              <span className="text-[10px] uppercase tracking-widest text-[#B68A55] bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full font-bold shadow-sm inline-block mb-2">
                {chapter.tag}
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#171614] leading-tight">
                {chapter.title}
              </h2>
              <p className="text-xs uppercase tracking-luxury text-[#6E675D] font-medium mt-1">
                {chapter.subtitle} • {chapter.clientName || 'Private Commission'}
              </p>
            </div>
          </div>

          {/* Story Details Body */}
          <div className="p-5 sm:p-6 lg:p-8 overflow-y-auto space-y-5 sm:space-y-6">
            <div className="flex flex-wrap items-center gap-4 text-xs text-[#7A756D] border-b border-[#E8DFC0] pb-4">
              <span className="flex items-center space-x-1.5">
                <MapPin className="w-4 h-4 text-[#B68A55]" />
                <span>{chapter.location}</span>
              </span>
              <span className="flex items-center space-x-1.5">
                <Calendar className="w-4 h-4 text-[#B68A55]" />
                <span>Jaipur Season Archive</span>
              </span>
              <span className="flex items-center space-x-1.5">
                <Camera className="w-4 h-4 text-[#B68A55]" />
                <span>4K DCI • 10-bit 4:2:2 Color Science</span>
              </span>
            </div>

            <div className="space-y-3 text-sm text-[#4E473F] leading-relaxed">
              <p>
                Every celebration possesses an unrepeatable frequency. In this chapter, our on-ground crew followed an observational documentary approach—refusing scripted poses to honor the spontaneous glances, unexpected outbursts of joy, and century-old customs.
              </p>
              <p>
                Color graded with warm amber highlights and creamy shadows to recreate the tactile aesthetic of vintage 35mm motion picture stock, synchronized live to curated acoustic instruments.
              </p>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#E8DFC0]">
              <div className="flex items-center space-x-2 text-xs text-[#8A8275]">
                <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
                <span>Loved by over 2,400 community members</span>
              </div>

              <div className="flex items-center space-x-3 w-full sm:w-auto">
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-xs uppercase tracking-luxury font-semibold text-[#7A756D] hover:text-[#171614]"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    onClose();
                    onOpenBooking();
                  }}
                  className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-5 py-2.5 bg-[#A67C4E] hover:bg-[#8F663B] text-white text-xs uppercase tracking-luxury font-semibold rounded-sm shadow-sm transition-colors cursor-pointer"
                >
                  <span>Book Similar Coverage</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
