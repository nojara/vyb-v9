import { useRef } from 'react';
import { motion } from 'motion/react';
import { ComputedSlide } from '@/data/slides';
import MotionBlock from '@/components/MotionBlock';
import SlideBackground from '@/components/SlideBackground';
import MediaPlaceholder from '@/components/MediaPlaceholder';
import { useMouseParallax } from '@/hooks/useMouseParallax';
import { useTranslatedSlide } from '@/hooks/useTranslatedSlide';
import { useLanguage } from '@/context/LanguageContext';
import { formatText } from '@/utils/formatText';

const ClosingSlide = ({ slide: rawSlide, index }: { slide: ComputedSlide; index: number }) => {
  const slide = useTranslatedSlide(rawSlide);
  const { lang } = useLanguage();
  const { palette } = slide;
  const containerRef = useRef<HTMLDivElement>(null);
  const mouse = useMouseParallax(containerRef, 24);

  return (
    <div ref={containerRef} className="relative w-full h-full flex flex-col items-center justify-center text-center px-5 md:px-8 pt-24 pb-24 no-glitch" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <SlideBackground bgImage={slide.bgImage} videoSrc={slide.bgVideo} index={index} textColor={palette.text} />

      {/* Parallax glow */}
      <motion.div
        className="absolute w-96 h-96 rounded-full blur-[120px] opacity-15 pointer-events-none"
        style={{ backgroundColor: palette.primary }}
        animate={{ x: mouse.x * 2, y: mouse.y * 2 }}
        transition={{ type: 'spring', stiffness: 40, damping: 25 }}
      />

      <div className="relative z-10 flex flex-col items-center">
        <MotionBlock motionKey="heroLift" delay={0.2}>
          <motion.h2
            className="vyb-hero-title mb-[var(--space-title-to-subtitle)]"
            style={{ color: palette.primary }}
            animate={{ x: mouse.x * 0.3, y: mouse.y * 0.2 }}
            transition={{ type: 'spring', stiffness: 70, damping: 35 }}
          >
            {formatText(slide.headline || '')}
          </motion.h2>
        </MotionBlock>

        {slide.subheadline && (
          <MotionBlock motionKey="blurResolve" delay={0.5}>
            <p className="vyb-subtitle opacity-70 mb-10" style={{ color: palette.text }}>
              {slide.subheadline}
            </p>
          </MotionBlock>
        )}

        {/* Media */}
        <div className="mb-8">
          <MediaPlaceholder
            style="cinematic"
            accentColor={palette.accent}
            textColor={palette.text}
            label="FINAL CUT"
            delay={0.6}
            videoSrc={slide.bgVideo}
          />
        </div>

        {slide.body?.map((para, i) => (
          <MotionBlock key={i} motionKey="ctaBreathe" delay={0.7 + i * 0.15}>
            <motion.p
              className="vyb-label opacity-40 mb-2"
              style={{ color: palette.text }}
              whileHover={{ opacity: 0.8 }}
            >
              {para}
            </motion.p>
          </MotionBlock>
        ))}

        <MotionBlock motionKey="ctaBreathe" delay={1.2} className="mt-[var(--space-body-to-cta)]">
          <motion.div
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
            className="w-16 h-[2px] mx-auto"
            style={{ backgroundColor: palette.primary }}
          />
        </MotionBlock>
      </div>
    </div>
  );
};

export default ClosingSlide;
