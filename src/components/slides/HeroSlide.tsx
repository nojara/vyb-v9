import { motion } from 'motion/react';
import { ComputedSlide } from '@/data/slides';
import AnimatedBlock from '@/components/AnimatedBlock';
import { formatText } from '@/utils/formatText';
import { ChevronDown } from 'lucide-react';

const HeroSlide = ({ slide, index }: { slide: ComputedSlide; index: number }) => {
  const { palette } = slide;

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center text-center px-5 md:px-8 pt-20 pb-16 overflow-hidden">
      {/* Badge / kicker */}
      <AnimatedBlock slideIndex={index} delay={0.2} className="mb-[var(--space-kicker-to-title)]">
        <span
          className="vyb-label inline-block px-6 py-2 rounded-full backdrop-blur-md border"
          style={{ borderColor: `${palette.primary}55`, color: palette.primary }}
        >
          {slide.body?.[0] || 'MOBILY × NOJARA STUDIOS × ELEVATE'}
        </span>
      </AnimatedBlock>

      {/* Headline — capped to fit viewport */}
      <AnimatedBlock slideIndex={index} delay={0.4}>
        <h1
          className="vyb-hero-title text-center"
          style={{
            color: palette.primary,
            fontSize: 'clamp(32px, 8vw, 120px)',
            maxWidth: '90vw',
            overflowWrap: 'break-word',
            wordBreak: 'break-word',
          }}
        >
          {formatText(slide.headline || '')}
        </h1>
      </AnimatedBlock>

      {/* Tagline */}
      {slide.subheadline && (
        <AnimatedBlock slideIndex={index} delay={0.6} className="mt-[var(--space-title-to-subtitle)]">
          <p className="vyb-subtitle opacity-80 text-center" style={{ color: palette.text }}>
            {slide.subheadline}
          </p>
        </AnimatedBlock>
      )}

      {/* Scroll hint */}
      <AnimatedBlock slideIndex={index} delay={0.8} className="mt-[var(--space-body-to-cta)]">
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
          className="vyb-ui-mono opacity-50 flex items-center gap-2"
          style={{ color: palette.text }}
        >
          <ChevronDown size={14} />
          SCROLL TO EXPLORE
          <ChevronDown size={14} />
        </motion.div>
      </AnimatedBlock>
    </div>
  );
};

export default HeroSlide;
