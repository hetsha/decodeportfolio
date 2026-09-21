import React from 'react';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { ASSET_URLS } from '../data/studioData';
import { IndianArchSvg, IndianLotusBotanicalSvg } from './IndianMotifs';

interface GrandCtaSectionProps {
  onOpenBooking: () => void;
  onOpenWhatsApp: () => void;
}

export const GrandCtaSection: React.FC<GrandCtaSectionProps> = ({
  onOpenBooking,
  onOpenWhatsApp,
}) => {
  return (
    <section
      className="bg-[#0C0C0B] text-white py-12 sm:py-16 lg:py-20 relative overflow-hidden dark-ambient-grain"
      id="contact"
    >
      {/* Traditional Warm Glowing Diya & Ceremonial Urli Ambient Background Image */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        <img
          alt="Ceremonial glowing brass Diya and marigold petals"
          className="w-full h-full object-cover object-bottom opacity-25 filter brightness-75"
          src={ASSET_URLS.ceremonialDiya}
        />
        {/* Heavy Atmospheric Charcoal Gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0C0C0B] via-[#0C0C0B]/90 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0C0C0B] via-transparent to-[#0C0C0B]" />
      </div>

      {/* Indian Arch Silhouette on Left Border */}
      <div className="absolute -left-16 sm:-left-20 top-1/2 -translate-y-1/2 w-48 sm:w-64 lg:w-80 h-[300px] sm:h-[400px] lg:h-[500px] opacity-[0.08] pointer-events-none select-none">
        <IndianArchSvg color="#FAF6F0" className="w-full h-full" />
      </div>

      {/* Floating Lotus Crest Center Background */}
      <motion.div
        animate={{ y: [0, -10, 0], opacity: [0.12, 0.2, 0.12] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute right-4 sm:right-8 lg:right-12 top-6 sm:top-8 lg:top-10 w-40 sm:w-56 lg:w-72 h-40 sm:h-56 lg:h-72 pointer-events-none select-none"
      >
        <IndianLotusBotanicalSvg color="#E8D5B5" className="w-full h-full" />
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 items-center">
          
          {/* Left: Call to Action Pitch & Form Triggers */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-8 flex flex-col space-y-6"
          >
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-normal leading-[1.02] tracking-tight text-[#FAF6F0]">
              YOUR MOMENT<br />
              <span className="italic text-[#E8D5B5]">DESERVES A STORY.</span>
            </h2>

            <p className="text-base sm:text-lg text-[#A69E92] font-light max-w-xl leading-relaxed">
              Let&apos;s create something beautiful together. Reach out to check our dates and commission our on-ground storytellers for your celebrations.
            </p>

            <div className="pt-3 sm:pt-4 flex flex-wrap items-center gap-3 sm:gap-4">
              <button
                type="button"
                onClick={onOpenBooking}
                className="inline-flex items-center space-x-3 px-8 py-4 bg-[#A67C4E] hover:bg-[#8F663B] text-white text-xs font-semibold uppercase tracking-luxury rounded-sm transition-all shadow-lg hover:shadow-xl active:scale-95 cursor-pointer"
              >
                <span>PLAN YOUR STORY</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={onOpenWhatsApp}
                className="inline-flex items-center space-x-3 px-7 py-4 border border-[#3A352D] hover:border-[#A67C4E] bg-black/40 backdrop-blur-md text-white text-xs font-semibold uppercase tracking-luxury rounded-sm transition-all active:scale-95 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                <span>WHATSAPP US</span>
              </button>
            </div>
          </motion.div>

          {/* Right: Poetic Cursive Accent Sign-Off */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-4 flex flex-col items-start lg:items-end justify-center text-left lg:text-right"
          >
            <div className="space-y-2 select-none">
              <p className="font-script-accent text-2xl sm:text-3xl lg:text-4xl xl:text-5xl text-[#CDB38B] leading-tight">
                Good Stories<br />
                Never End
              </p>
              <div className="w-20 h-[1.5px] bg-[#A67C4E] lg:ml-auto mt-3" />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
