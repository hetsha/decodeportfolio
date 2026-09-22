import React, { useState } from 'react';
import { Gem, Clapperboard, Sparkles, Landmark, Compass, CheckCircle, ArrowRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ServiceItem } from '../types';
import { IndianArchSvg, IndianLotusBotanicalSvg } from './IndianMotifs';

interface ServicesSectionProps {
  onSelectServiceForBooking?: (serviceTitle: string) => void;
  services?: ServiceItem[];
  section?: Record<string, string>;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectServiceForBooking, services: propServices, section }) => {
  const services = propServices || [];
  const [activeModalService, setActiveModalService] = useState<ServiceItem | null>(null);

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'gem':
        return <Gem className="w-6 h-6 stroke-1" />;
      case 'clapperboard':
        return <Clapperboard className="w-6 h-6 stroke-1" />;
      case 'sparkles':
        return <Sparkles className="w-6 h-6 stroke-1" />;
      case 'landmark':
        return <Landmark className="w-6 h-6 stroke-1" />;
      case 'compass':
        return <Compass className="w-6 h-6 stroke-1" />;
      default:
        return <Sparkles className="w-6 h-6 stroke-1" />;
    }
  };

  return (
    <section
      className="py-20 lg:py-28 bg-[#F5EFE6] relative paper-texture overflow-hidden"
      id="services"
      style={{
        background: 'linear-gradient(rgb(245, 239, 230) 0%, rgb(245, 239, 230) 80%, rgb(240, 233, 223) 100%)',
      }}
    >
      {/* Mughal Arch Corner Art - Bottom Left with scroll-draw animation */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 0.45, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
        className="absolute -bottom-10 -left-10 w-72 sm:w-80 h-72 sm:h-80 pointer-events-none mix-blend-multiply z-0 select-none"
      >
        <IndianArchSvg animated={true} color="#A67C4E" className="w-full h-full" />
      </motion.div>

      {/* Top Right Botanical Flourish with gentle float */}
      <motion.div
        animate={{ y: [0, -8, 0], rotate: [0, 2, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-4 right-4 w-44 h-44 pointer-events-none mix-blend-multiply opacity-35 z-0"
      >
        <IndianLotusBotanicalSvg color="#B68A55" className="w-full h-full" />
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="max-w-xl mb-16">
          <span className="text-xs uppercase tracking-ultra text-[#7A756D] font-semibold block mb-3">
            {section?.section_label || 'WHAT WE CREATE'}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#171614] leading-tight">
            {section?.headline_line1 || 'Different Stories.'}<br />
            {section?.headline_line2 || 'Same Emotions.'}
          </h2>
          <div className="w-12 h-[1.5px] bg-[#B68A55] mt-4" />
        </div>

        {/* 5 Horizontal Minimalist Service Cards - Connected Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-0 border-t border-[#E3D7C7] pt-8">
          {services.map((service, index) => {
            const isLastInRow = (index % 2 === 1) || index === services.length - 1;
            const isLastRow = index >= services.length - 2;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.5 }}
                whileHover={{ y: -6 }}
                onClick={() => setActiveModalService(service)}
                className={`group p-5 sm:p-6 bg-[#FAF6F0] flex flex-col items-center text-center cursor-pointer relative transition-all duration-300
                  border-b border-[#E8DFC0]
                  ${index % 2 === 0 && !isLastInRow ? 'border-r border-[#E8DFC0]' : ''}
                  ${index % 2 === 1 || isLastInRow ? 'border-r-0' : ''}
                  lg:border-r lg:border-b-0
                  lg:last:border-r-0
                  hover:z-10 hover:shadow-lg hover:bg-[#FAF6F0]
                `}
              >
                {/* Connector dot - top (except first row) */}
                {index >= 2 && (
                  <div className="absolute -top-[5px] left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-[#B68A55] border-2 border-[#FAF6F0] z-10 hidden sm:block lg:hidden" />
                )}

                {/* Connector line - vertical between rows */}
                {index >= 2 && (
                  <div className="absolute -top-[17px] left-1/2 w-[1.5px] h-3 bg-[#D5C8B7] hidden sm:block lg:hidden" />
                )}

                {/* Connector dot - right (except last in row on lg) */}
                {index % 2 === 0 && index + 1 < services.length && (
                  <div className="absolute top-1/2 -right-[5px] -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[#B68A55] border-2 border-[#FAF6F0] z-10 sm:hidden" />
                )}

                {/* Connector line - horizontal between cols on mobile */}
                {index % 2 === 0 && index + 1 < services.length && (
                  <div className="absolute top-1/2 -right-[17px] -translate-y-1/2 h-[1.5px] w-3 bg-[#D5C8B7] sm:hidden" />
                )}

                {/* Icon Container */}
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#F3ECE0] flex items-center justify-center text-[#B68A55] mb-4 sm:mb-5 group-hover:scale-110 group-hover:bg-[#B68A55] group-hover:text-white transition-all duration-300 shadow-sm">
                  {renderIcon(service.iconName)}
                </div>

                {/* Title & Tagline */}
                <h3 className="font-serif text-base sm:text-xl font-bold text-[#171614] mb-1 sm:mb-2">
                  {service.title}
                </h3>
                <p className="text-[10px] sm:text-xs uppercase tracking-wider text-[#8A8378] font-medium">
                  {service.tagline}
                </p>

                {/* Hover Cue */}
                <span className="mt-3 sm:mt-4 text-[10px] uppercase tracking-luxury text-[#B68A55] opacity-0 group-hover:opacity-100 transition-opacity font-semibold">
                  {section?.explore_label || 'Explore Details →'}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Interactive Service Details Modal */}
      <AnimatePresence>
        {activeModalService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            onClick={() => setActiveModalService(null)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#FAF6F0] border border-[#D5C8B7] rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveModalService(null)}
                className="absolute top-4 right-4 p-2 rounded-full text-[#7A756D] hover:text-[#171614] hover:bg-[#E8DFC0]/50 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-[#E8D5B5]/60 flex items-center justify-center text-[#8F663B]">
                  {renderIcon(activeModalService.iconName)}
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-luxury text-[#B68A55] font-semibold">
                    {section?.blueprint_label || 'Service Blueprint'}
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-[#171614]">
                    {activeModalService.title}
                  </h3>
                </div>
              </div>

              <div className="mb-4 inline-block px-3 py-1 bg-[#F0E9DF] rounded-full text-xs font-semibold text-[#8F663B]">
                ⚡ {section?.turnaround_label || 'Turnaround:'} {activeModalService.turnaroundTime}
              </div>

              <p className="text-sm text-[#5A554E] leading-relaxed mb-6">
                {activeModalService.description}
              </p>

              <div className="space-y-2 mb-6">
                <span className="text-xs uppercase tracking-wider text-[#7A756D] font-bold block mb-2">
                  {section?.included_label || "What's Included:"}
                </span>
                {activeModalService.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center space-x-2 text-xs text-[#3E3832]">
                    <CheckCircle className="w-4 h-4 text-[#A67C4E] flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-[#E8DFC0]">
                <button
                  type="button"
                  onClick={() => setActiveModalService(null)}
                  className="px-4 py-2 text-xs uppercase tracking-luxury font-semibold text-[#7A756D] hover:text-[#171614]"
                >
                  {section?.close_label || 'Close'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const title = activeModalService.title;
                    setActiveModalService(null);
                    onSelectServiceForBooking?.(title);
                  }}
                  className="inline-flex items-center space-x-2 px-5 py-2.5 bg-[#A67C4E] hover:bg-[#8F663B] text-white text-xs uppercase tracking-luxury font-semibold rounded-sm shadow-sm transition-colors"
                >
                  <span>{section?.book_cta || 'Book This Service'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
