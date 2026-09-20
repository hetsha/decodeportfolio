import React from 'react';
import { motion, type Variants } from 'motion/react';

interface MotifProps {
  className?: string;
  color?: string;
  animated?: boolean;
}

const lotusVariants: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      duration: 1.8,
      ease: 'easeInOut',
    },
  },
};

const archVariants: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      duration: 2.2,
      ease: 'easeInOut',
    },
  },
};

/**
 * Indian Lotus Botanical Line Art Motif
 * Exactly matching the uploaded ornamental lotus scrollwork
 */
export const IndianLotusBotanicalSvg: React.FC<MotifProps> = ({
  className = 'w-full h-full',
  color = '#B68A55',
  animated = false,
}) => {
  return (
    <svg
      viewBox="0 0 400 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      preserveAspectRatio="xMidYMid meet"
    >
      <g stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        {/* Top Pinnacle Dot */}
        <motion.circle
          cx="200"
          cy="60"
          r="3"
          fill={color}
          stroke="none"
          initial={animated ? { scale: 0 } : false}
          whileInView={animated ? { scale: 1 } : undefined}
          viewport={{ once: true }}
        />

        {/* Outer petal side dots */}
        <motion.circle
          cx="142"
          cy="88"
          r="2.5"
          fill={color}
          stroke="none"
          initial={animated ? { scale: 0 } : false}
          whileInView={animated ? { scale: 1 } : undefined}
          viewport={{ once: true }}
        />
        <motion.circle
          cx="258"
          cy="88"
          r="2.5"
          fill={color}
          stroke="none"
          initial={animated ? { scale: 0 } : false}
          whileInView={animated ? { scale: 1 } : undefined}
          viewport={{ once: true }}
        />

        {/* Central Lotus Flower Petals */}
        <motion.path
          d="M200,68 C206,100 216,140 200,165 C184,140 194,100 200,68 Z"
          variants={animated ? lotusVariants : undefined}
          initial={animated ? 'hidden' : undefined}
          whileInView={animated ? 'visible' : undefined}
          viewport={{ once: true }}
        />

        {/* Left inner petal */}
        <motion.path
          d="M145,95 C165,115 185,145 198,165 C180,150 155,130 145,95 Z"
          variants={animated ? lotusVariants : undefined}
          initial={animated ? 'hidden' : undefined}
          whileInView={animated ? 'visible' : undefined}
          viewport={{ once: true }}
        />
        {/* Right inner petal */}
        <motion.path
          d="M255,95 C235,115 215,145 202,165 C220,150 245,130 255,95 Z"
          variants={animated ? lotusVariants : undefined}
          initial={animated ? 'hidden' : undefined}
          whileInView={animated ? 'visible' : undefined}
          viewport={{ once: true }}
        />

        {/* Left middle petal */}
        <motion.path
          d="M105,135 C135,140 170,155 195,167 C165,160 125,152 105,135 Z"
          variants={animated ? lotusVariants : undefined}
          initial={animated ? 'hidden' : undefined}
          whileInView={animated ? 'visible' : undefined}
          viewport={{ once: true }}
        />
        {/* Right middle petal */}
        <motion.path
          d="M295,135 C265,140 230,155 205,167 C235,160 275,152 295,135 Z"
          variants={animated ? lotusVariants : undefined}
          initial={animated ? 'hidden' : undefined}
          whileInView={animated ? 'visible' : undefined}
          viewport={{ once: true }}
        />

        {/* Left horizontal petal */}
        <motion.path
          d="M90,165 C125,163 165,167 195,170 C155,175 115,175 90,165 Z"
          variants={animated ? lotusVariants : undefined}
          initial={animated ? 'hidden' : undefined}
          whileInView={animated ? 'visible' : undefined}
          viewport={{ once: true }}
        />
        {/* Right horizontal petal */}
        <motion.path
          d="M310,165 C275,163 235,167 205,170 C245,175 285,175 310,165 Z"
          variants={animated ? lotusVariants : undefined}
          initial={animated ? 'hidden' : undefined}
          whileInView={animated ? 'visible' : undefined}
          viewport={{ once: true }}
        />

        {/* Calyx Base Dish */}
        <motion.path
          d="M175,176 C185,183 215,183 225,176 C215,181 185,181 175,176 Z"
          variants={animated ? lotusVariants : undefined}
          initial={animated ? 'hidden' : undefined}
          whileInView={animated ? 'visible' : undefined}
          viewport={{ once: true }}
        />

        {/* Grand Left S-Scrollwork with Spiral */}
        <motion.path
          d="M200,183 C180,183 140,174 115,188 C90,202 100,236 128,242 C152,246 166,228 152,208 C138,188 105,210 115,235 C125,258 160,260 190,230 C200,220 200,200 200,183"
          variants={animated ? lotusVariants : undefined}
          initial={animated ? 'hidden' : undefined}
          whileInView={animated ? 'visible' : undefined}
          viewport={{ once: true }}
        />

        {/* Grand Right S-Scrollwork with Spiral */}
        <motion.path
          d="M200,183 C220,183 260,174 285,188 C310,202 300,236 272,242 C248,246 234,228 248,208 C262,188 295,210 285,235 C275,258 240,260 210,230 C200,220 200,200 200,183"
          variants={animated ? lotusVariants : undefined}
          initial={animated ? 'hidden' : undefined}
          whileInView={animated ? 'visible' : undefined}
          viewport={{ once: true }}
        />

        {/* Left Extended Outer Ear Scroll */}
        <motion.path
          d="M102,230 C75,230 48,242 48,262 C48,282 78,288 95,278 C115,266 128,245 138,225"
          variants={animated ? lotusVariants : undefined}
          initial={animated ? 'hidden' : undefined}
          whileInView={animated ? 'visible' : undefined}
          viewport={{ once: true }}
        />
        <motion.circle
          cx="84"
          cy="234"
          r="3"
          fill="none"
          stroke={color}
          strokeWidth="1.5"
        />

        {/* Right Extended Outer Ear Scroll */}
        <motion.path
          d="M298,230 C325,230 352,242 352,262 C352,282 322,288 305,278 C285,266 272,245 262,225"
          variants={animated ? lotusVariants : undefined}
          initial={animated ? 'hidden' : undefined}
          whileInView={animated ? 'visible' : undefined}
          viewport={{ once: true }}
        />
        <motion.circle
          cx="316"
          cy="234"
          r="3"
          fill="none"
          stroke={color}
          strokeWidth="1.5"
        />

        {/* Center Stem */}
        <motion.path
          d="M200,245 L200,340"
          variants={animated ? lotusVariants : undefined}
          initial={animated ? 'hidden' : undefined}
          whileInView={animated ? 'visible' : undefined}
          viewport={{ once: true }}
        />

        {/* Lower Left Leaf */}
        <motion.path
          d="M195,295 C170,295 155,325 155,350 C175,348 195,330 195,295 Z"
          variants={animated ? lotusVariants : undefined}
          initial={animated ? 'hidden' : undefined}
          whileInView={animated ? 'visible' : undefined}
          viewport={{ once: true }}
        />

        {/* Lower Right Leaf */}
        <motion.path
          d="M205,295 C230,295 245,325 245,350 C225,348 205,330 205,295 Z"
          variants={animated ? lotusVariants : undefined}
          initial={animated ? 'hidden' : undefined}
          whileInView={animated ? 'visible' : undefined}
          viewport={{ once: true }}
        />
      </g>
    </svg>
  );
};

/**
 * Indian Arch & Pillars Line Art Motif
 * Exactly matching the uploaded Mughal archway with fluted columns and scalloped apex
 */
export const IndianArchSvg: React.FC<MotifProps> = ({
  className = 'w-full h-full',
  color = '#B68A55',
  animated = false,
}) => {
  return (
    <svg
      viewBox="0 0 450 620"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      preserveAspectRatio="xMidYMid meet"
    >
      <g stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        {/* Top Finial / Kalash Droplet */}
        <motion.circle cx="225" cy="18" r="2.5" fill={color} stroke="none" />
        <motion.path
          d="M225,23 C220,35 212,45 225,56 C238,45 230,35 225,23 Z"
          variants={animated ? archVariants : undefined}
          initial={animated ? 'hidden' : undefined}
          whileInView={animated ? 'visible' : undefined}
          viewport={{ once: true }}
        />

        {/* Top Outer Bracket Framing */}
        <motion.path
          d="M40,65 L170,65"
          variants={animated ? archVariants : undefined}
          initial={animated ? 'hidden' : undefined}
          whileInView={animated ? 'visible' : undefined}
          viewport={{ once: true }}
        />
        <motion.path
          d="M40,65 L40,180"
          variants={animated ? archVariants : undefined}
          initial={animated ? 'hidden' : undefined}
          whileInView={animated ? 'visible' : undefined}
          viewport={{ once: true }}
        />
        <motion.path
          d="M280,65 L410,65"
          variants={animated ? archVariants : undefined}
          initial={animated ? 'hidden' : undefined}
          whileInView={animated ? 'visible' : undefined}
          viewport={{ once: true }}
        />
        <motion.path
          d="M410,65 L410,180"
          variants={animated ? archVariants : undefined}
          initial={animated ? 'hidden' : undefined}
          whileInView={animated ? 'visible' : undefined}
          viewport={{ once: true }}
        />

        {/* Outer Grand Ogival Arch */}
        <motion.path
          d="M65,280 C65,150 145,55 225,55 C305,55 385,150 385,280"
          variants={animated ? archVariants : undefined}
          initial={animated ? 'hidden' : undefined}
          whileInView={animated ? 'visible' : undefined}
          viewport={{ once: true }}
        />
        <motion.path
          d="M75,280 C75,160 150,78 225,78 C300,78 375,160 375,280"
          variants={animated ? archVariants : undefined}
          initial={animated ? 'hidden' : undefined}
          whileInView={animated ? 'visible' : undefined}
          viewport={{ once: true }}
        />

        {/* Arch Spandrel Decorative Spirals */}
        <motion.circle cx="127" cy="115" r="2" fill={color} stroke="none" />
        <motion.path
          d="M95,118 C120,118 155,125 155,145 C155,160 135,165 135,145 C135,130 155,135 155,165 C155,190 120,225 152,225"
          variants={animated ? archVariants : undefined}
          initial={animated ? 'hidden' : undefined}
          whileInView={animated ? 'visible' : undefined}
          viewport={{ once: true }}
        />

        <motion.circle cx="323" cy="115" r="2" fill={color} stroke="none" />
        <motion.path
          d="M355,118 C330,118 295,125 295,145 C295,160 315,165 315,145 C315,130 295,135 295,165 C295,190 330,225 298,225"
          variants={animated ? archVariants : undefined}
          initial={animated ? 'hidden' : undefined}
          whileInView={animated ? 'visible' : undefined}
          viewport={{ once: true }}
        />

        {/* Inner Scalloped / Cusped Mughal Archway */}
        <motion.path
          d="M110,580 L110,290 C110,270 125,260 140,265 C155,250 170,240 190,250 C205,230 220,190 225,185 C230,190 245,230 260,250 C280,240 295,250 310,265 C325,260 340,270 340,290 L340,580"
          variants={animated ? archVariants : undefined}
          initial={animated ? 'hidden' : undefined}
          whileInView={animated ? 'visible' : undefined}
          viewport={{ once: true }}
        />

        {/* Column Capital Horizontal Dividing Bands (Left) */}
        <motion.path d="M60,280 L115,280" />
        <motion.path d="M65,290 L110,290" />

        {/* Column Capital Horizontal Dividing Bands (Right) */}
        <motion.path d="M335,280 L390,280" />
        <motion.path d="M340,290 L385,290" />

        {/* Left Fluted Pillar Lines */}
        <motion.path d="M68,290 L68,580" />
        <motion.path d="M78,290 L78,580" />
        <motion.path d="M88,290 L88,580" />
        <motion.path d="M98,290 L98,580" />

        {/* Right Fluted Pillar Lines */}
        <motion.path d="M352,290 L352,580" />
        <motion.path d="M362,290 L362,580" />
        <motion.path d="M372,290 L372,580" />
        <motion.path d="M382,290 L382,580" />

        {/* Column Base Bands */}
        <motion.path d="M60,580 L115,580" />
        <motion.path d="M335,580 L390,580" />
      </g>
    </svg>
  );
};
