import React, { useState } from 'react';
import { Camera, Edit3, Scissors, Send, ArrowRight, Clock, Zap } from 'lucide-react';
import { motion } from 'motion/react';
import { PROCESS_STEPS } from '../data/studioData';
import { IndianLotusBotanicalSvg } from './IndianMotifs';

interface InstantReelsProcessSectionProps {
  onOpenBooking: () => void;
}

export const InstantReelsProcessSection: React.FC<InstantReelsProcessSectionProps> = ({
  onOpenBooking,
}) => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  const getStepIcon = (iconName: string) => {
    switch (iconName) {
      case 'camera':
        return <Camera className="w-6 h-6 stroke-1" />;
      case 'edit-3':
        return <Edit3 className="w-6 h-6 stroke-1" />;
      case 'scissors':
        return <Scissors className="w-6 h-6 stroke-1" />;
      case 'send':
        return <Send className="w-6 h-6 stroke-1" />;
      default:
        return <Camera className="w-6 h-6 stroke-1" />;
    }
  };

  const currentStep = PROCESS_STEPS[activeStepIndex];

  return (
    <section
      className="py-16 sm:py-20 lg:py-28 bg-[#F5EFE6] paper-texture relative"
      id="instant-reels"
    >
      {/* Smooth blur transition from previous section */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-t from-transparent via-[#F3EDE3] to-[#F0E9DF] pointer-events-none z-20" />

      {/* Background Indian Botanical Lotus Crest */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.12 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[450px] lg:w-[550px] h-[300px] sm:h-[450px] lg:h-[550px] pointer-events-none mix-blend-multiply z-0 select-none"
      >
        <IndianLotusBotanicalSvg color="#B68A55" className="w-full h-full" />
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left: Signature Service Pitch */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-4 flex flex-col space-y-4 sm:space-y-5"
          >
            <span className="text-xs uppercase tracking-ultra text-[#7A756D] font-semibold">
              OUR SIGNATURE SERVICE
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#171614] leading-[1.05]">
              Instant Reels
            </h2>
            <p className="text-base text-[#5E584E] font-light leading-relaxed">
              Your event is happening now. Your content shouldn&apos;t arrive weeks later. We film, color grade, curate music, and deliver Instagram-ready 4K reels while your guests are still on the dance floor.
            </p>
            <div>
              <button
                type="button"
                onClick={onOpenBooking}
                className="inline-flex items-center space-x-2 px-6 py-3 bg-[#A67C4E] hover:bg-[#8F663B] text-white text-xs uppercase font-medium tracking-[0.16em] rounded-sm transition-colors cursor-pointer shadow-md"
              >
                <span>KNOW MORE</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>

          {/* Right: 4-Step Horizontal Process Pipeline */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 relative">
              {PROCESS_STEPS.map((stepItem, index) => {
                const isSelected = activeStepIndex === index;
                return (
                  <motion.div
                    key={stepItem.step}
                    whileHover={{ y: -4 }}
                    onClick={() => setActiveStepIndex(index)}
                    className="flex flex-col items-center sm:items-start text-center sm:text-left relative group cursor-pointer"
                  >
                    {/* Icon Box */}
                    <div
                      className={`w-12 h-12 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl border flex items-center justify-center transition-all duration-300 shadow-sm ${
                        isSelected
                          ? 'border-[#A67C4E] bg-[#A67C4E] text-white ring-4 ring-[#A67C4E]/15'
                          : 'border-[#D5C8B7] bg-[#FAF6F0] text-[#A67C4E] group-hover:border-[#A67C4E] group-hover:bg-[#A67C4E] group-hover:text-white'
                      }`}
                    >
                      {getStepIcon(stepItem.iconName)}
                    </div>

                    {/* Step Number & Title */}
                    <span className="text-[10px] sm:text-xs font-bold text-[#A67C4E] tracking-widest uppercase mt-2 sm:mt-3">
                      {stepItem.step}
                    </span>
                    <h4 className="font-serif text-base sm:text-lg font-bold text-[#171614] uppercase tracking-wider mt-1 mb-1 sm:mb-1.5">
                      {stepItem.title}
                    </h4>
                    <p className="text-[11px] sm:text-xs text-[#7A7266] leading-relaxed">
                      {stepItem.description}
                    </p>

                    {/* Connecting Arrow for Desktop */}
                    {index < PROCESS_STEPS.length - 1 && (
                      <div className="hidden md:block absolute top-7 -right-4 text-[#C2B5A3]">
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>

            {/* Interactive Step Timeline Deep Dive Box */}
            <motion.div
              layout
              className="mt-8 sm:mt-10 p-4 sm:p-5 lg:p-6 bg-[#FAF6F0] rounded-xl border border-[#E3D7C7] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 shadow-sm"
            >
              <div className="space-y-1">
                <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-luxury text-[#A67C4E]">
                  <Zap className="w-4 h-4" />
                  <span>Phase {currentStep.step}: {currentStep.title}</span>
                  <span className="text-[#C2B5A3]">•</span>
                  <span className="flex items-center space-x-1 text-[#7A7266]">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{currentStep.timing}</span>
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#554E44]">
                  {currentStep.detail}
                </p>
              </div>

              <div className="flex items-center space-x-2 self-end sm:self-center">
                <span className="text-[10px] uppercase tracking-wider text-[#8A8378]">
                  Step {activeStepIndex + 1} of 4
                </span>
              </div>
            </motion.div>
          </div>

        </div>
      </div>

      {/* Bottom Wave Arch Transition into #0C0C0B */}
      <div className="absolute bottom-0 inset-x-0 w-full overflow-hidden leading-none z-10 pointer-events-none">
        <div className="w-full h-10 bg-gradient-to-b from-transparent to-[#0C0C0B]/30 absolute bottom-0 inset-x-0 z-0" />
        <svg
          className="relative block w-full h-14 sm:h-20 lg:h-24 text-[#0C0C0B]"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 1440 120"
        >
          <path d="M0,60 Q720,0 1440,60 L1440,120 L0,120 Z" fill="currentColor" />
          <path d="M0,60 Q720,0 1440,60" opacity="0.4" stroke="#B68A55" strokeWidth="1.5" />
        </svg>
      </div>
    </section>
  );
};
