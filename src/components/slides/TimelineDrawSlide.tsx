import { motion } from 'motion/react';
import { ComputedSlide } from '@/data/slides';
import MotionBlock from '@/components/MotionBlock';
import SlideBackground from '@/components/SlideBackground';
import MediaPlaceholder from '@/components/MediaPlaceholder';
import { useTranslatedSlide } from '@/hooks/useTranslatedSlide';
import { useLanguage } from '@/context/LanguageContext';
import { formatText } from '@/utils/formatText';

const TimelineDrawSlide = ({ slide: rawSlide, index }: { slide: ComputedSlide; index: number }) => {
  const slide = useTranslatedSlide(rawSlide);
  const { lang } = useLanguage();
  const { palette } = slide;

  return (
    <div className="relative w-full h-full flex items-center px-5 md:px-24 pt-20 pb-16 overflow-y-auto md:overflow-visible" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <SlideBackground bgImage={slide.bgImage} videoSrc={slide.bgVideo} index={index} textColor={palette.text} />
      <div className="relative z-10 w-full max-w-6xl grid grid-cols-1 md:grid-cols-[1fr_auto] gap-10 items-start">
        <div className="max-w-3xl">
          <MotionBlock motionKey="spotlightFade" delay={0}>
            <span className="vyb-label opacity-40 mb-[var(--space-kicker-to-title)] block" style={{ color: palette.text }}>
              {slide.section}
            </span>
          </MotionBlock>

          {slide.headline && (
            <MotionBlock motionKey="heroLift" delay={0.1}>
              <motion.h2
                className="vyb-section-title mb-2"
                style={{ color: palette.primary }}
                whileHover={{ x: 4 }}
                transition={{ duration: 0.3 }}
              >
                {formatText(slide.headline)}
              </motion.h2>
            </MotionBlock>
          )}

          {slide.subheadline && (
            <MotionBlock motionKey="blurResolve" delay={0.15}>
              <p className="vyb-subtitle opacity-60 mb-10" style={{ color: palette.text }}>
                {slide.subheadline}
              </p>
            </MotionBlock>
          )}

          <div className="relative pl-8 border-l" style={{ borderColor: `${palette.primary}33` }}>
            {slide.timeline?.map((entry, i) => (
              <MotionBlock key={i} motionKey="timelineDraw" delay={0.2 + i * 0.18} className="mb-8 last:mb-0 relative">
                <motion.div
                  className="absolute -left-[calc(2rem+5px)] top-1 w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: palette.primary }}
                  whileHover={{ scale: 1.8 }}
                  transition={{ duration: 0.2 }}
                />
                <motion.div whileHover={{ x: 4 }} transition={{ duration: 0.25 }}>
                  <span className="vyb-label opacity-60 block mb-1" style={{ color: palette.primary }}>
                    {entry.time}
                  </span>
                  <h3 className="vyb-body-lg font-[var(--fw-body-strong)] mb-2" style={{ color: palette.text }}>
                    {entry.title}
                  </h3>
                  <p className="vyb-body-sm opacity-60 max-w-2xl" style={{ color: palette.text }}>
                    {entry.text}
                  </p>
                </motion.div>
              </MotionBlock>
            ))}
          </div>
        </div>

        {/* Side media placeholder */}
        <div className="hidden md:flex flex-col items-center">
          <MediaPlaceholder
            style="portrait"
            accentColor={palette.primary}
            textColor={palette.text}
            label="EPISODE"
            delay={0.5}
          />
        </div>
      </div>
    </div>
  );
};

export default TimelineDrawSlide;
