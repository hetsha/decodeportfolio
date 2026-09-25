import React from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { IndianArchSvg, IndianLotusBotanicalSvg } from './IndianMotifs';

const WhatsAppIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor" focusable="false">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

interface GrandCtaSectionProps {
  onOpenBooking: () => void;
  onOpenWhatsApp: () => void;
  assetUrl?: string;
  section?: Record<string, string>;
}

export const GrandCtaSection: React.FC<GrandCtaSectionProps> = ({
  onOpenBooking,
  onOpenWhatsApp,
  assetUrl,
  section,
}) => {
  return (
    <section
      className="bg-[#0d1f1a] text-white py-12 sm:py-16 lg:py-20 relative overflow-hidden dark-ambient-grain"
      id="contact"
    >
      {/* Traditional Warm Glowing Diya & Ceremonial Urli Ambient Background Image */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        {assetUrl && <img
          alt="Ceremonial glowing brass Diya and marigold petals"
          className="w-full h-full object-cover object-bottom opacity-25 filter brightness-75"
          src={assetUrl}
        />}
        {/* Heavy Atmospheric Gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d1f1a] via-[#0d1f1a]/90 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d1f1a] via-transparent to-[#0d1f1a]" />
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
              {section?.headline_line1 || 'YOUR MOMENT'}<br />
              <span className="italic text-[#E8D5B5]">{section?.headline_line2 || 'DESERVES A STORY.'}</span>
            </h2>

            <p className="text-base sm:text-lg text-[#A69E92] font-light max-w-xl leading-relaxed">
              {section?.description || "Let's create something beautiful together. Reach out to check our dates and commission our on-ground storytellers for your celebrations."}
            </p>

            <div className="pt-3 sm:pt-4 flex flex-wrap items-center gap-3 sm:gap-4">
              <button
                type="button"
                onClick={onOpenBooking}
                className="flex-1 basis-0 min-w-[190px] inline-flex items-center justify-center space-x-3 px-7 py-4 bg-[#A67C4E] hover:bg-[#8F663B] text-white text-xs font-semibold uppercase tracking-luxury rounded-sm transition-all shadow-lg hover:shadow-xl active:scale-95 cursor-pointer"
              >
                <span>{section?.primary_cta || 'PLAN YOUR STORY'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={onOpenWhatsApp}
                className="flex-1 basis-0 min-w-[190px] inline-flex items-center justify-center space-x-3 px-7 py-4 border border-[#3A352D] hover:border-[#A67C4E] bg-black/40 backdrop-blur-md text-white text-xs font-semibold uppercase tracking-luxury rounded-sm transition-all active:scale-95 cursor-pointer"
              >
                <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
                <span>{section?.secondary_cta || 'WHATSAPP US'}</span>
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
                {(section?.signoff || 'Good Stories Never End').split(' ').slice(0, Math.ceil((section?.signoff || 'Good Stories Never End').split(' ').length / 2)).join(' ')}<br />
                {(section?.signoff || 'Good Stories Never End').split(' ').slice(Math.ceil((section?.signoff || 'Good Stories Never End').split(' ').length / 2)).join(' ')}
              </p>
              <div className="w-20 h-[1.5px] bg-[#A67C4E] lg:ml-auto mt-3" />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
