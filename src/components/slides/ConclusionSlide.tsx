import { motion } from 'motion/react';
import { ComputedSlide } from '@/data/slides';
import AnimatedBlock from '@/components/AnimatedBlock';
import { formatText } from '@/utils/formatText';

const ConclusionSlide = ({ slide, index }: { slide: ComputedSlide; index: number }) => {
  const { palette } = slide;

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center text-center px-5 md:px-8 pt-20 pb-16">
      <AnimatedBlock slideIndex={index} delay={0.2}>
        <h2 className="vyb-hero-title mb-[var(--space-title-to-subtitle)]" style={{ color: palette.primary }}>
          {formatText(slide.headline || '')}
        </h2>
      </AnimatedBlock>

      {slide.subheadline && (
        <AnimatedBlock slideIndex={index} delay={0.4}>
          <p className="vyb-subtitle opacity-70 mb-8" style={{ color: palette.text }}>
            {slide.subheadline}
          </p>
        </AnimatedBlock>
      )}

      {slide.body?.map((para, i) => (
        <AnimatedBlock key={i} slideIndex={index} delay={0.6 + i * 0.12}>
          <p className="vyb-label opacity-40 mb-2" style={{ color: palette.text }}>
            {para}
          </p>
        </AnimatedBlock>
      ))}

      <AnimatedBlock slideIndex={index} delay={1.0} className="mt-[var(--space-body-to-cta)]">
        <motion.div
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
          className="w-16 h-[2px] mx-auto"
          style={{ backgroundColor: palette.primary }}
        />
      </AnimatedBlock>
    </div>
  );
};

export default ConclusionSlide;
