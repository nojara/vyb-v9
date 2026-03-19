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

const ManifestoSlide = ({ slide: rawSlide, index }: { slide: ComputedSlide; index: number }) => {
  const slide = useTranslatedSlide(rawSlide);
  const { lang } = useLanguage();
  const { palette } = slide;
  const containerRef = useRef<HTMLDivElement>(null);
  const mouse = useMouseParallax(containerRef, 18);

  return (
    <div ref={containerRef} className="relative w-full h-full flex flex-col items-center justify-center text-center px-5 md:px-24 pt-20 pb-16" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <SlideBackground bgImage={slide.bgImage} videoSrc={slide.bgVideo} index={index} textColor={palette.text} />

      {/* Parallax floating ring */}
      <motion.div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[300px] h-[300px] rounded-full border pointer-events-none opacity-10"
        style={{ borderColor: palette.primary }}
        animate={{ x: mouse.x * 2, y: mouse.y * 2, rotate: mouse.rotateY }}
        transition={{ type: 'spring', stiffness: 40, damping: 25 }}
      />

      <div className="relative z-10 max-w-4xl flex flex-col items-center">
        {slide.headline && (
          <MotionBlock motionKey="statementDrop" delay={0.2}>
            <motion.h2
              className="vyb-section-title mb-[var(--space-title-to-subtitle)]"
              style={{ color: palette.primary }}
              animate={{ x: mouse.x * 0.3, y: mouse.y * 0.2 }}
              transition={{ type: 'spring', stiffness: 70, damping: 35 }}
              whileHover={{ letterSpacing: '0.02em' }}
            >
              {formatText(slide.headline)}
            </motion.h2>
          </MotionBlock>
        )}

        {slide.subheadline && (
          <MotionBlock motionKey="blurResolve" delay={0.4}>
            <motion.p
              className="vyb-subtitle opacity-80 mb-[var(--space-subtitle-to-body)]"
              style={{ color: palette.text }}
              animate={{ x: -mouse.x * 0.15 }}
              transition={{ type: 'spring', stiffness: 60, damping: 30 }}
            >
              {slide.subheadline}
            </motion.p>
          </MotionBlock>
        )}

        {slide.body?.map((para, i) => (
          <MotionBlock key={i} motionKey="editorialSweep" delay={0.5 + i * 0.15}>
            <motion.p
              className="vyb-body-lg opacity-70 mb-[var(--space-body-to-body)] max-w-3xl mx-auto"
              style={{ color: palette.text }}
              whileHover={{ opacity: 1, x: 4 }}
              transition={{ duration: 0.3 }}
            >
              {formatText(para)}
            </motion.p>
          </MotionBlock>
        ))}

        {/* Media placeholder — editorial style */}
        <div className="mt-8">
          <MediaPlaceholder
            style="panoramic"
            accentColor={palette.primary}
            textColor={palette.text}
            label="EXPLORE"
            delay={0.8}
            imageSrc={slide.bgImage}
          />
        </div>
      </div>
    </div>
  );
};

export default ManifestoSlide;
