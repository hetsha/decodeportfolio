import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, ArrowUpRight, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { StoryChapter } from '../types';
import { IndianLotusBotanicalSvg, IndianArchSvg } from './IndianMotifs';

interface FeaturedStoriesSectionProps {
  onOpenStoryChapter: (chapter: StoryChapter) => void;
  selectedFilter?: string;
  chapters?: StoryChapter[];
  section?: Record<string, string>;
  categories?: string[];
}

export const FeaturedStoriesSection: React.FC<FeaturedStoriesSectionProps> = ({
  onOpenStoryChapter,
  selectedFilter,
  chapters: propChapters,
  section,
  categories: propCategories,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState(selectedFilter || 'All');
  const [isHovered, setIsHovered] = useState(false);
  const autoScrollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const allChapters = propChapters || [];
  const polaroidUrl = allChapters.find((c) => c.polaroidImageUrl)?.polaroidImageUrl;

  const categories = propCategories && propCategories.length > 0
    ? propCategories
    : allChapters.length > 0
      ? ['All', ...new Set(allChapters.map((c) => c.category).filter(Boolean))]
      : (section?.categories || '').split('|').map((s) => s.trim()).filter(Boolean);

  useEffect(() => {
    if (selectedFilter) {
      setActiveCategoryFilter(selectedFilter);
      setCurrentIndex(0);
    }
  }, [selectedFilter]);

  const filteredChapters = activeCategoryFilter === 'All'
    ? allChapters
    : allChapters.filter((c) => c.category.toLowerCase() === activeCategoryFilter.toLowerCase());

  // Auto-scroll carousel
  useEffect(() => {
    if (filteredChapters.length <= 3 || isHovered) {
      if (autoScrollRef.current) clearInterval(autoScrollRef.current);
      return;
    }
    autoScrollRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % filteredChapters.length);
    }, 4000);
    return () => {
      if (autoScrollRef.current) clearInterval(autoScrollRef.current);
    };
  }, [filteredChapters.length, isHovered]);

  // Safe carousel rotation
  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? filteredChapters.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredChapters.length);
  };

  // 3 items to show simultaneously on desktop
  const visibleItems = filteredChapters.length <= 3
    ? filteredChapters
    : [
        filteredChapters[currentIndex % filteredChapters.length],
        filteredChapters[(currentIndex + 1) % filteredChapters.length],
        filteredChapters[(currentIndex + 2) % filteredChapters.length],
      ];

  return (
    <section
      className="py-16 sm:py-20 lg:py-28 bg-[#F0E9DF] relative paper-texture"
      id="work"
      style={{
        background: 'linear-gradient(rgb(240, 233, 223) 0%, rgb(240, 233, 223) 75%, rgb(245, 239, 230) 100%)',
        boxShadow: 'rgba(74, 52, 33, 0.04) 0px 20px 35px -20px inset, rgba(74, 52, 33, 0.04) 0px -20px 35px -20px inset',
      }}
    >
      {/* Botanical Lotus Line Art - Top Right with Floating Animation */}
      <motion.div
        animate={{ y: [0, -10, 0], rotate: [0, 1.5, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-16 -right-8 sm:-right-12 w-48 sm:w-80 lg:w-96 h-auto pointer-events-none mix-blend-multiply opacity-40 z-0 select-none"
      >
        <IndianLotusBotanicalSvg animated={true} color="#B68A55" className="w-full h-full" />
      </motion.div>

      {/* Mughal Arch Line Art - Bottom Left */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.35 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="absolute -bottom-16 -left-8 sm:-left-12 w-48 sm:w-72 lg:w-80 h-48 sm:h-72 lg:h-80 pointer-events-none mix-blend-multiply z-0 select-none"
      >
        <IndianArchSvg color="#8F663B" className="w-full h-full" />
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        {/* Section Title & Carousel Arrows */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 sm:mb-8 gap-4">
          <div>
            <span className="text-xs uppercase tracking-ultra text-[#7A756D] font-semibold block mb-2">
              {section?.section_label || 'A FEW STORIES'}
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-normal text-[#171614]">
              {section?.headline || 'Curated Chapters'}
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 w-full sm:w-auto">
            {/* Category quick tabs */}
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveCategoryFilter(cat);
                    setCurrentIndex(0);
                  }}
                  className={`text-xs px-3 py-1 rounded-full uppercase tracking-wider transition-all ${
                    activeCategoryFilter === cat
                      ? 'bg-[#171614] text-white font-semibold'
                      : 'text-[#7A756D] hover:text-[#171614]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Carousel Buttons */}
            <div className="flex items-center space-x-3">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous story"
                className="w-10 h-10 rounded-full border border-[#D5C8B7] flex items-center justify-center hover:border-[#171614] hover:bg-[#171614] hover:text-white transition-colors cursor-pointer shadow-sm"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next story"
                className="w-10 h-10 rounded-full border border-[#D5C8B7] flex items-center justify-center hover:border-[#171614] hover:bg-[#171614] hover:text-white transition-colors cursor-pointer shadow-sm"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Main 3 Editorial Cards Grid + Floating Polaroid Side Accent */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div
            className="lg:col-span-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <AnimatePresence mode="popLayout">
              {visibleItems.map((chapter) => (
                <motion.article
                  key={chapter.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  onClick={() => onOpenStoryChapter(chapter)}
                  className="group relative rounded-xl sm:rounded-2xl overflow-hidden aspect-[3/4] sm:aspect-[3/4.4] shadow-card-lift bg-stone-900 cursor-pointer"
                >
                  {/* Photo with smooth zoom */}
                  <img
                    alt={chapter.title}
                    className="w-full h-full object-cover img-zoom"
                    src={chapter.imageUrl}
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                  {/* Card Content Top & Bottom */}
                  <div className="absolute inset-0 p-4 sm:p-6 flex flex-col justify-between z-10">
                    <span className="text-[10px] uppercase tracking-widest text-[#E8D5B5] bg-black/40 backdrop-blur-sm self-start px-2.5 py-1 rounded-full border border-white/10 font-medium">
                      {chapter.tag}
                    </span>

                    <div className="flex items-end justify-between">
                      <div>
                        <h3 className="font-serif text-lg sm:text-xl lg:text-2xl text-white font-medium leading-tight group-hover:text-[#E8D5B5] transition-colors">
                          {chapter.title.split(' ').length > 2 ? (
                            <>
                              {chapter.title.split(' ').slice(0, 2).join(' ')}<br />
                              {chapter.title.split(' ').slice(2).join(' ')}
                            </>
                          ) : (
                            chapter.title
                          )}
                        </h3>
                        <p className="text-[11px] text-[#BFB6A8] mt-1 tracking-wider uppercase font-medium">
                          {chapter.subtitle}
                        </p>
                      </div>

                      <motion.div
                        whileHover={{ scale: 1.15, rotate: 45 }}
                        className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center text-white group-hover:bg-[#B68A55] group-hover:border-[#B68A55] transition-colors shadow-md"
                      >
                        <ArrowUpRight className="w-4 h-4" />
                      </motion.div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>

          {/* Right Side Accent: Cursive Stamp & Vintage Polaroid Mockup */}
          <div className="hidden lg:col-span-2 lg:flex flex-col items-center justify-center space-y-6 pt-12">
            <div className="text-center select-none">
              <p className="font-script-accent text-3xl text-[#7E694E] leading-none">
                {section?.decorative_line1 || 'Real People'}
              </p>
              <p className="font-script-accent text-3xl text-[#A67C4E] leading-tight">
                {section?.decorative_line2 || 'Real Stories.'}
              </p>
              <span className="inline-block text-[#A67C4E] text-lg mt-1 animate-pulse">
                <Heart className="w-4 h-4 fill-current inline-block" />
              </span>
            </div>

            {/* Tilted Vintage Polaroid Mockup */}
            <motion.div
              whileHover={{ rotate: 0, scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="bg-white p-3 pb-7 rounded-sm shadow-xl transform rotate-6 border border-stone-200 w-36 cursor-pointer"
            >
              <div className="w-full aspect-square bg-stone-100 overflow-hidden shadow-inner">
                {polaroidUrl ? (
                  <img src={polaroidUrl} alt="Polaroid" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-amber-100 to-amber-200" />
                )}
              </div>
              <p className="text-[10px] font-script-accent text-center text-stone-600 mt-2 tracking-wide">
                {section?.polaroid_caption || 'Forever & Ever'}
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
