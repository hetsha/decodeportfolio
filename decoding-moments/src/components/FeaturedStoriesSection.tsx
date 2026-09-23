import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Play, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { StoryChapter } from '../types';
import { IndianLotusBotanicalSvg, IndianArchSvg } from './IndianMotifs';

interface FeaturedStoriesSectionProps {
  onOpenStoryChapter: (chapter: StoryChapter) => void;
  onFilterChange?: (cat: string) => void;
  selectedFilter?: string;
  chapters?: StoryChapter[];
  section?: Record<string, string>;
  categories?: string[];
}

export const FeaturedStoriesSection: React.FC<FeaturedStoriesSectionProps> = ({
  onOpenStoryChapter,
  onFilterChange,
  selectedFilter,
  chapters: propChapters,
  section,
  categories: propCategories,
}) => {
  const [activeCategoryFilter, setActiveCategoryFilter] = useState(selectedFilter || 'All');
  const scrollerRef = useRef<HTMLDivElement>(null);

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
      scrollerRef.current?.scrollTo({ left: 0 });
    }
  }, [selectedFilter]);

  const filteredChapters = activeCategoryFilter === 'All'
    ? allChapters
    : allChapters.filter((c) => c.category.toLowerCase() === activeCategoryFilter.toLowerCase());

  const scrollByDir = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>('[data-reel-card]');
    const delta = (card?.offsetWidth || 260) + 16;
    el.scrollBy({ left: dir * delta, behavior: 'smooth' });
  };

  return (
    <section
      className="py-16 sm:py-20 lg:py-28 bg-[#F0E9DF] relative paper-texture"
      id="work"
      style={{
        background: 'linear-gradient(rgb(240, 233, 223) 0%, rgb(240, 233, 223) 75%, rgb(245, 239, 230) 100%)',
        boxShadow: 'rgba(74, 52, 33, 0.04) 0px 20px 35px -20px inset, rgba(74, 52, 33, 0.04) 0px -20px 35px -20px inset',
      }}
    >
      <motion.div
        animate={{ y: [0, -10, 0], rotate: [0, 1.5, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-16 -right-8 sm:-right-12 w-48 sm:w-80 lg:w-96 h-auto pointer-events-none mix-blend-multiply opacity-40 z-0 select-none"
      >
        <IndianLotusBotanicalSvg animated={true} color="#B68A55" className="w-full h-full" />
      </motion.div>

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
        {/* Section Title, Arrows & Category Filters */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-4">
            <div>
              <span className="text-xs uppercase tracking-ultra text-[#7A756D] font-semibold block mb-2">
                {section?.section_label || 'A FEW STORIES'}
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-normal text-[#171614]">
                {section?.headline || 'Curated Chapters'}
              </h2>
            </div>

            <div className="flex items-center space-x-3">
              <button
                type="button"
                onClick={() => scrollByDir(-1)}
                aria-label="Previous stories"
                className="w-10 h-10 rounded-full border border-[#D5C8B7] flex items-center justify-center hover:border-[#171614] hover:bg-[#171614] hover:text-white transition-colors cursor-pointer shadow-sm"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => scrollByDir(1)}
                aria-label="Next stories"
                className="w-10 h-10 rounded-full border border-[#D5C8B7] flex items-center justify-center hover:border-[#171614] hover:bg-[#171614] hover:text-white transition-colors cursor-pointer shadow-sm"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="-mx-6 px-6 sm:mx-0 sm:px-0 overflow-x-auto no-scrollbar sm:overflow-x-visible">
            <div className="flex sm:flex-wrap items-center gap-2 w-max sm:w-auto">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => {
                    setActiveCategoryFilter(cat);
                    onFilterChange?.(cat);
                    scrollerRef.current?.scrollTo({ left: 0 });
                  }}
                  className={`shrink-0 text-[11px] px-3.5 py-1.5 rounded-full border uppercase tracking-wider transition-all whitespace-nowrap ${
                    activeCategoryFilter === cat
                      ? 'bg-[#171614] text-white border-[#171614] font-semibold shadow-sm'
                      : 'bg-transparent text-[#7A756D] border-[#D5C8B7] hover:border-[#171614] hover:text-[#171614]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Reel-style horizontal strip + polaroid accent */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-10 relative">
            <div
              ref={scrollerRef}
              className="flex gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory -mx-6 px-6 sm:mx-0 sm:px-0 pb-2"
            >
              <AnimatePresence mode="popLayout">
                {filteredChapters.map((chapter, i) => (
                  <motion.article
                    key={chapter.id}
                    layout
                    data-reel-card
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4, delay: Math.min(i * 0.05, 0.3) }}
                    onClick={() => onOpenStoryChapter(chapter)}
                    className="group relative shrink-0 w-[68vw] max-w-[260px] sm:w-[220px] lg:w-[240px] xl:w-[260px] aspect-[9/16] rounded-2xl sm:rounded-3xl overflow-hidden snap-start bg-stone-900 cursor-pointer border border-white/10"
                  >
                    <img
                      alt={chapter.title}
                      className="w-full h-full object-cover img-zoom"
                      src={chapter.imageUrl}
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-black/40" />

                    {/* Reel play affordance */}
                    <div className="absolute inset-0 flex items-center justify-center z-10">
                      <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/50 flex items-center justify-center text-white group-hover:bg-[#B68A55] group-hover:border-[#B68A55] transition-colors shadow-xl">
                        <Play className="w-5 h-5 fill-white ml-0.5" />
                      </div>
                    </div>

                    <div className="absolute top-3 inset-x-3 flex items-start justify-between z-10">
                      <span className="text-[9px] uppercase tracking-widest text-[#E8D5B5] bg-black/45 backdrop-blur-sm px-2 py-0.5 rounded-full border border-white/10 font-medium">
                        {chapter.tag}
                      </span>
                      <span className="text-[9px] uppercase tracking-wider text-white/80 bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded-full">
                        {chapter.category}
                      </span>
                    </div>

                    <div className="absolute inset-x-0 bottom-0 p-4 z-10">
                      <h3 className="font-serif text-lg text-white font-medium leading-snug group-hover:text-[#E8D5B5] transition-colors line-clamp-2">
                        {chapter.title}
                      </h3>
                      <p className="text-[10px] text-[#BFB6A8] mt-1 tracking-wider uppercase font-medium line-clamp-1">
                        {chapter.subtitle}
                      </p>
                      <div className="mt-2 h-0.5 w-10 rounded-full bg-[#B68A55]/70 group-hover:w-16 transition-all duration-300" />
                    </div>

                    {/* iOS-style home indicator */}
                    <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-8 h-1 rounded-full bg-white/40 z-10" />
                  </motion.article>
                ))}
              </AnimatePresence>
            </div>

            {filteredChapters.length === 0 && (
              <p className="text-sm text-[#7A756D] py-8 text-center">
                No stories in this filter yet.
              </p>
            )}
          </div>

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
