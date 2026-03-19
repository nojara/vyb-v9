import { motion } from 'motion/react';
import { ComputedSlide } from '@/data/slides';
import AnimatedBlock from '@/components/AnimatedBlock';
import { formatText } from '@/utils/formatText';

const HeroSlide = ({ slide, index }: { slide: ComputedSlide; index: number }) => {
  const { palette } = slide;

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center text-center px-5 md:px-8 pt-20 pb-16">
      {/* Badge / kicker */}
      <AnimatedBlock slideIndex={index} delay={0.2} className="mb-[var(--space-kicker-to-title)]">
        <span
          className="vyb-label inline-block px-6 py-2 rounded-full backdrop-blur-md border"
          style={{ borderColor: `${palette.primary}55`, color: palette.primary }}
        >
          {slide.body?.[0] || 'MOBILY × NOJARA STUDIOS × ELEVATE'}
        </span>
      </AnimatedBlock>

      {/* Headline */}
      <AnimatedBlock slideIndex={index} delay={0.4}>
        <h1 className="vyb-hero-title" style={{ color: palette.primary }}>
          {formatText(slide.headline || '')}
        </h1>
      </AnimatedBlock>

      {/* Tagline */}
      {slide.subheadline && (
        <AnimatedBlock slideIndex={index} delay={0.6} className="mt-[var(--space-title-to-subtitle)]">
          <p className="vyb-subtitle opacity-80" style={{ color: palette.text }}>
            {slide.subheadline}
          </p>
        </AnimatedBlock>
      )}

      {/* CTA Arrow */}
      <AnimatedBlock slideIndex={index} delay={0.8} className="mt-[var(--space-body-to-cta)]">
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
          className="vyb-ui-mono opacity-50"
          style={{ color: palette.text }}
        >
          ↓ SCROLL TO EXPLORE
        </motion.div>
      </AnimatedBlock>
    </div>
  );
};

export default HeroSlide;
