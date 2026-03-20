import { useRef } from 'react';
import { motion } from 'motion/react';
import { ComputedSlide } from '@/data/slides';
import MotionBlock from '@/components/MotionBlock';
import SlideBackground from '@/components/SlideBackground';
import DimLayer from '@/components/DimLayer';
import ScrollArrow from '@/components/ScrollArrow';
import { useMouseParallax } from '@/hooks/useMouseParallax';
import { useTranslatedSlide } from '@/hooks/useTranslatedSlide';
import { useLanguage } from '@/context/LanguageContext';
import { formatText } from '@/utils/formatText';

const ManifestoSlide = ({ slide: rawSlide, index }: { slide: ComputedSlide; index: number }) => {
  const slide = useTranslatedSlide(rawSlide);
  const { lang } = useLanguage();
  const { palette } = slide;
  const containerRef = useRef<HTMLDivElement>(null);
  const mouse = useMouseParallax(containerRef, 18);
  const hasBg = !!(slide.bgImage || slide.bgVideo);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full flex flex-col items-center justify-center px-5 md:px-24 pt-24 pb-24 no-glitch"
      dir={lang === 'ar' ? 'rtl' : 'ltr'}
    >
      <SlideBackground bgImage={slide.bgImage} videoSrc={slide.bgVideo} index={index} textColor={palette.text} />
      {hasBg && <DimLayer opacity={0.5} />}

      {/* Parallax floating ring */}
      <motion.div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[300px] h-[300px] rounded-full border pointer-events-none opacity-10"
        style={{ borderColor: palette.primary }}
        animate={{ x: mouse.x * 2, y: mouse.y * 2 }}
        transition={{ type: 'spring', stiffness: 40, damping: 25 }}
      />

      {/* #4: Body text left-aligned, only headline centered */}
      <div className="relative z-10 max-w-4xl flex flex-col items-center">
        {slide.headline && (
          <MotionBlock motionKey="statementDrop" delay={0.2}>
            <motion.h2
              className="vyb-section-title mb-[var(--space-title-to-subtitle)] text-center"
              style={{
                color: palette.primary,
                fontSize: 'clamp(28px, 6vw, 112px)',
              }}
              animate={{ x: mouse.x * 0.3, y: mouse.y * 0.2 }}
              transition={{ type: 'spring', stiffness: 70, damping: 35 }}
            >
              {formatText(slide.headline)}
            </motion.h2>
          </MotionBlock>
        )}

        {slide.subheadline && (
          <MotionBlock motionKey="blurResolve" delay={0.4}>
            <motion.p
              className="vyb-subtitle opacity-80 mb-[var(--space-subtitle-to-body)] text-center"
              style={{ color: palette.text }}
              animate={{ x: -mouse.x * 0.15 }}
              transition={{ type: 'spring', stiffness: 60, damping: 30 }}
            >
              {slide.subheadline}
            </motion.p>
          </MotionBlock>
        )}

        {/* #4: Body paragraphs left-aligned */}
        <div className="w-full">
          {slide.body?.map((para, i) => (
            <MotionBlock key={i} motionKey="editorialSweep" delay={0.5 + i * 0.15}>
              <motion.p
                className="vyb-body-lg opacity-70 mb-[var(--space-body-to-body)] text-left clean-hover"
                style={{ color: palette.text, maxWidth: 'var(--mw-body)' }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {formatText(para)}
              </motion.p>
            </MotionBlock>
          ))}
        </div>

        {/* #8: Scroll arrow CTA at bottom of text-heavy sections */}
        <ScrollArrow color={palette.text} delay={0.8 + (slide.body?.length || 0) * 0.15} />
      </div>
    </div>
  );
};

export default ManifestoSlide;
