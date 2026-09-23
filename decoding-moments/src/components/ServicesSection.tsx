import React from 'react';
import { Gem, Flower2, Soup, Gift, CakeSlice, Car, House, PartyPopper } from 'lucide-react';
import { motion } from 'motion/react';
import { DecodingMomentsLogo } from './DecodingMomentsLogo';
import { IndianArchSvg, IndianLotusBotanicalSvg } from './IndianMotifs';

interface ServicesSectionProps {
  section?: Record<string, string>;
}

interface EventDef {
  title: string;
  icon: React.ReactNode;
}

const EVENTS_COVERED: EventDef[] = [
  { title: 'Weddings', icon: <Gem className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.25]" /> },
  { title: 'Engagement (Sagai)', icon: <Flower2 className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.25]" /> },
  { title: 'Haldi Ceremony', icon: <Soup className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.25]" /> },
  { title: 'Baby Shower', icon: <Gift className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.25]" /> },
  { title: 'Birthdays', icon: <CakeSlice className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.25]" /> },
  { title: 'Car Delivery & Opening Ceremony', icon: <Car className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.25]" /> },
  { title: 'Housewarming', icon: <House className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.25]" /> },
  { title: 'Family Celebrations & Special Events', icon: <PartyPopper className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.25]" /> },
];

const GoldSparkle: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    <path
      d="M12 1.5 L13.4 10.6 L22.5 12 L13.4 13.4 L12 22.5 L10.6 13.4 L1.5 12 L10.6 10.6 Z"
      fill="#B68A55"
    />
  </svg>
);

const GoldDot: React.FC<{ className?: string }> = ({ className = '' }) => (
  <span className={`absolute rounded-full bg-[#B68A55] pointer-events-none ${className}`} aria-hidden="true" />
);

const EventItem: React.FC<{ event: EventDef; index: number }> = ({ event, index }) => (
  <motion.article
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.25 }}
    transition={{ duration: 0.5, delay: 0.08 + index * 0.06, ease: 'easeOut' }}
    className="group flex flex-col items-center text-center px-2 sm:px-4 py-7 md:py-10 md:border-l md:border-[#E8DFC0] md:[&:nth-child(4n+1)]:border-l-0 select-none"
  >
    <div className="w-11 h-11 sm:w-13 sm:h-13 md:w-14 md:h-14 rounded-full bg-[#F3ECE0] flex items-center justify-center text-[#B68A55] mb-4 transition-all duration-300 group-hover:text-[#8F663B] group-hover:scale-105">
      {event.icon}
    </div>
    <h3 className="font-serif text-[13px] sm:text-sm md:text-lg font-medium text-[#171614] leading-snug break-words max-w-full">
      {event.title}
    </h3>
  </motion.article>
);

export const ServicesSection: React.FC<ServicesSectionProps> = () => {
  return (
    <section className="relative z-30 flow-root" id="services">
      {/* Curved cream top — overlaps the dark section so the joint is never a flat edge */}
      <div className="h-14 sm:h-24 lg:h-28 -mt-14 sm:-mt-24 lg:-mt-28 overflow-hidden leading-none pointer-events-none">
        <svg
          className="block w-full h-full text-[#F5EFE6]"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 1440 120"
          aria-hidden="true"
        >
          <path d="M0,60 Q720,120 1440,60 L1440,120 L0,120 Z" fill="currentColor" />
          <path
            d="M0,60 Q720,120 1440,60"
            className="opacity-0 sm:opacity-[0.35]"
            stroke="#B68A55"
            strokeWidth="1.5"
          />
        </svg>
      </div>

      <div
        className="py-20 lg:py-28 relative paper-texture overflow-hidden -mt-px"
        style={{
          background: 'linear-gradient(rgb(245, 239, 230) 0%, rgb(245, 239, 230) 80%, rgb(240, 233, 223) 100%)',
        }}
      >
      {/* ── Line-art decorations ───────────────────────────── */}

      {/* Mughal arch — bottom left */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        whileInView={{ opacity: 0.4, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.3 }}
        className="absolute -bottom-12 -left-12 w-72 sm:w-96 h-72 sm:h-96 pointer-events-none mix-blend-multiply z-0 select-none"
      >
        <IndianArchSvg animated={true} color="#A67C4E" className="w-full h-full" />
      </motion.div>

      {/* Botanical flourish — top right */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.4 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, delay: 0.15 }}
        className="absolute -top-6 -right-8 w-52 sm:w-72 h-52 sm:h-72 pointer-events-none mix-blend-multiply z-0 select-none"
      >
        <IndianLotusBotanicalSvg animated={true} color="#B68A55" className="w-full h-full" />
      </motion.div>

      {/* Botanical flourish — bottom right (mirrored) */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.28 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, delay: 0.3 }}
        className="absolute -bottom-8 -right-10 w-48 sm:w-64 h-48 sm:h-64 pointer-events-none mix-blend-multiply z-0 select-none scale-x-[-1]"
      >
        <IndianLotusBotanicalSvg color="#B68A55" className="w-full h-full" />
      </motion.div>

      {/* Botanical flourish — mid left (small, faint) */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.18 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, delay: 0.4 }}
        className="absolute top-[38%] -left-16 w-40 sm:w-52 h-40 sm:h-52 pointer-events-none mix-blend-multiply z-0 select-none rotate-90"
      >
        <IndianLotusBotanicalSvg color="#A67C4E" className="w-full h-full" />
      </motion.div>

      {/* Thin ornamental arc over logo area */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay: 0.35, ease: 'easeOut' }}
        className="absolute left-1/2 -translate-x-1/2 top-10 sm:top-14 w-[min(640px,92vw)] pointer-events-none z-0"
        aria-hidden="true"
      >
        <svg viewBox="0 0 600 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
          <path
            d="M 30 150 Q 300 -10 570 150"
            stroke="#B68A55"
            strokeOpacity="0.3"
            strokeWidth="1"
            strokeLinecap="round"
          />
          <path
            d="M 70 150 Q 300 20 530 150"
            stroke="#B68A55"
            strokeOpacity="0.15"
            strokeWidth="1"
            strokeLinecap="round"
          />
        </svg>
      </motion.div>

      {/* Sparkles */}
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        whileInView={{ opacity: 0.7, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="absolute top-16 sm:top-20 left-[12%] z-0 pointer-events-none"
      >
        <GoldSparkle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        whileInView={{ opacity: 0.55, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.65 }}
        className="absolute top-28 sm:top-32 right-[14%] z-0 pointer-events-none"
      >
        <GoldSparkle className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        whileInView={{ opacity: 0.5, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="absolute bottom-40 left-[22%] z-0 pointer-events-none hidden sm:block"
      >
        <GoldSparkle className="w-3 h-3" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        whileInView={{ opacity: 0.45, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.9 }}
        className="absolute bottom-52 right-[20%] z-0 pointer-events-none"
      >
        <GoldSparkle className="w-2.5 h-2.5" />
      </motion.div>

      {/* Faint gold dots */}
      <GoldDot className="top-1/4 left-[8%] w-1.5 h-1.5 opacity-30" />
      <GoldDot className="top-[45%] right-[7%] w-1 h-1 opacity-25" />
      <GoldDot className="bottom-1/4 left-[30%] w-1 h-1 opacity-20" />
      <GoldDot className="top-[22%] right-[30%] w-1.5 h-1.5 opacity-25 hidden sm:block" />
      <GoldDot className="bottom-[30%] right-[35%] w-1 h-1 opacity-20 hidden sm:block" />

      {/* ── Laptop-only background enhancements ───────────── */}
      <div className="hidden lg:block" aria-hidden="true">
        {/* Soft radial glow behind logo */}
        <div className="absolute left-1/2 -translate-x-1/2 -top-4 w-[760px] h-[440px] pointer-events-none z-0 bg-[radial-gradient(ellipse_at_center,rgba(182,138,85,0.11)_0%,rgba(182,138,85,0.045)_48%,transparent_72%)]" />

        {/* Large botanical watermark — mid left */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.32 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 0.25 }}
          className="absolute top-[30%] -left-20 w-[380px] h-[380px] pointer-events-none mix-blend-multiply z-0 select-none"
        >
          <IndianLotusBotanicalSvg color="#A67C4E" className="w-full h-full" />
        </motion.div>

        {/* Large botanical watermark — mid right (mirrored) */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.32 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 0.35 }}
          className="absolute top-[32%] -right-24 w-[400px] h-[400px] pointer-events-none mix-blend-multiply z-0 select-none scale-x-[-1]"
        >
          <IndianLotusBotanicalSvg color="#B68A55" className="w-full h-full" />
        </motion.div>

        {/* Faint Mughal arch watermark — upper left, larger */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.22 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, delay: 0.3 }}
          className="absolute -top-8 left-[14%] w-64 h-72 pointer-events-none mix-blend-multiply z-0 select-none"
        >
          <IndianArchSvg color="#A67C4E" className="w-full h-full" />
        </motion.div>

        {/* Vertical hairlines echoing the grid columns, out in the margins */}
        <span className="absolute top-[26%] left-[5%] w-px h-[48%] bg-gradient-to-b from-transparent via-[#B68A55]/25 to-transparent pointer-events-none z-0" />
        <span className="absolute top-[26%] right-[5%] w-px h-[48%] bg-gradient-to-b from-transparent via-[#B68A55]/25 to-transparent pointer-events-none z-0" />
        <span className="absolute top-[30%] left-[9%] w-px h-[40%] bg-gradient-to-b from-transparent via-[#E8DFC0]/70 to-transparent pointer-events-none z-0" />
        <span className="absolute top-[30%] right-[9%] w-px h-[40%] bg-gradient-to-b from-transparent via-[#E8DFC0]/70 to-transparent pointer-events-none z-0" />

        {/* Extra sparkles across the wide field */}
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          whileInView={{ opacity: 0.55, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="absolute top-[40%] left-[7%] pointer-events-none z-0"
        >
          <GoldSparkle className="w-3.5 h-3.5" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          whileInView={{ opacity: 0.5, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.85 }}
          className="absolute top-[48%] right-[8%] pointer-events-none z-0"
        >
          <GoldSparkle className="w-3 h-3" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          whileInView={{ opacity: 0.45, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 1 }}
          className="absolute bottom-[18%] left-[40%] pointer-events-none z-0"
        >
          <GoldSparkle className="w-2.5 h-2.5" />
        </motion.div>

        {/* Extra gold dots for the wide field */}
        <GoldDot className="top-[18%] left-[24%] w-1.5 h-1.5 opacity-30" />
        <GoldDot className="top-[55%] left-[15%] w-1 h-1 opacity-25" />
        <GoldDot className="top-[50%] right-[18%] w-1.5 h-1.5 opacity-25" />
        <GoldDot className="bottom-[22%] right-[28%] w-1 h-1 opacity-20" />
        <GoldDot className="bottom-[28%] left-[18%] w-1 h-1 opacity-20" />
      </div>

      {/* ── Content ────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        {/* Logo centerpiece + script accent */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15, ease: 'easeOut' }}
          className="relative flex flex-col items-center mt-8 mb-8 md:mt-10 md:mb-4"
        >
          <DecodingMomentsLogo
            variant="full"
            colorMode="gold"
            className="w-36 sm:w-44 md:w-52 lg:w-60 h-auto"
          />
          <p className="mt-4 lg:mt-0 lg:absolute lg:left-full lg:ml-12 lg:top-6 font-script-accent text-lg sm:text-xl text-[#8E785C] leading-snug text-center lg:text-left rotate-[-3deg] max-w-[200px]">
            More than events.
            <br />
            Stories for a lifetime.
          </p>
          {/* Tiny diamond divider under logo */}
          <div className="flex items-center gap-2 mt-5" aria-hidden="true">
            <span className="w-8 h-px bg-gradient-to-r from-transparent to-[#B68A55]/50" />
            <span className="w-1.5 h-1.5 rotate-45 bg-[#B68A55]/60" />
            <span className="w-8 h-px bg-gradient-to-l from-transparent to-[#B68A55]/50" />
          </div>
        </motion.div>

        {/* Events — 2×4 mobile/tablet, 4×2 desktop */}
        <div className="grid grid-cols-2 md:grid-cols-4 md:border-t md:border-[#E8DFC0]">
          {EVENTS_COVERED.map((event, index) => (
            <EventItem key={event.title} event={event} index={index} />
          ))}
        </div>

        {/* Closing statement with gold lines + side sparkles */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
          className="mt-12 md:mt-16 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 max-w-3xl mx-auto"
        >
          <span className="hidden sm:flex items-center gap-2">
            <span className="h-px w-14 lg:w-20 bg-gradient-to-r from-transparent to-[#B68A55]/50" />
            <GoldSparkle className="w-2.5 h-2.5 opacity-60" />
          </span>
          <p className="font-serif italic text-center text-lg sm:text-xl lg:text-2xl text-[#8E785C] leading-relaxed">
            No matter the occasion, every celebration deserves to be captured beautifully.
          </p>
          <span className="hidden sm:flex items-center gap-2">
            <GoldSparkle className="w-2.5 h-2.5 opacity-60" />
            <span className="h-px w-14 lg:w-20 bg-gradient-to-l from-transparent to-[#B68A55]/50" />
          </span>
        </motion.div>
      </div>
      </div>
    </section>
  );
};
