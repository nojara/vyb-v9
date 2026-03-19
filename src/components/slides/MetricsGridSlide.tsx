import { motion } from 'motion/react';
import { ComputedSlide } from '@/data/slides';
import MotionBlock from '@/components/MotionBlock';
import SlideBackground from '@/components/SlideBackground';
import MediaPlaceholder from '@/components/MediaPlaceholder';
import { useTranslatedSlide } from '@/hooks/useTranslatedSlide';
import { useLanguage } from '@/context/LanguageContext';
import { formatText } from '@/utils/formatText';

const MetricsGridSlide = ({ slide: rawSlide, index }: { slide: ComputedSlide; index: number }) => {
  const slide = useTranslatedSlide(rawSlide);
  const { lang } = useLanguage();
  const { palette } = slide;

  return (
    <div className="relative w-full h-full flex items-center px-5 md:px-24 pt-20 pb-16 overflow-y-auto md:overflow-visible" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <SlideBackground bgImage={slide.bgImage} videoSrc={slide.bgVideo} index={index} textColor={palette.text} />
      <div className="relative z-10 w-full max-w-6xl">
        {slide.headline && (
          <MotionBlock motionKey="heroLift" delay={0}>
            <motion.h2
              className="vyb-section-title mb-[var(--space-kicker-to-title)]"
              style={{ color: palette.primary }}
              whileHover={{ scale: 1.01 }}
            >
              {formatText(slide.headline)}
            </motion.h2>
          </MotionBlock>
        )}

        {slide.subheadline && (
          <MotionBlock motionKey="blurResolve" delay={0.1}>
            <p className="vyb-subtitle opacity-70 mb-12" style={{ color: palette.text }}>
              {slide.subheadline}
            </p>
          </MotionBlock>
        )}

        <div className="grid grid-cols-2 gap-4 md:gap-8 mb-6 md:mb-10">
          {slide.stats?.map((stat, i) => (
            <MotionBlock key={i} motionKey="metricCountIn" delay={0.2 + i * 0.15}>
              <motion.div
                className="text-center p-6 md:p-8 rounded-[var(--vyb-radius-card)] border backdrop-blur-md md:backdrop-blur-xl relative overflow-hidden group"
                style={{ borderColor: `${palette.primary}15`, background: `${palette.primary}06` }}
                whileHover={{ scale: 1.08, borderColor: `${palette.primary}50`, y: -5 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Glow effect on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: `radial-gradient(circle at 50% 50%, ${palette.primary}12, transparent 70%)` }}
                />
                <span className="vyb-metric block relative z-10" style={{ color: palette.primary }}>
                  {stat.value}
                </span>
                <span className="vyb-label block mt-3 opacity-50 max-w-[200px] mx-auto relative z-10" style={{ color: palette.text }}>
                  {stat.label}
                </span>
              </motion.div>
            </MotionBlock>
          ))}
        </div>

        {/* Centered media placeholder */}
        <div className="flex justify-center">
          <MediaPlaceholder
            style="panoramic"
            accentColor={palette.primary}
            textColor={palette.text}
            label="DATA INSIGHTS"
            delay={0.7}
          />
        </div>

        {slide.body?.map((para, i) => (
          <MotionBlock key={i} motionKey="paragraphUnfold" delay={0.8 + i * 0.1} className="mt-6">
            <p className="vyb-body-sm opacity-50 max-w-3xl text-center mx-auto" style={{ color: palette.text }}>
              {formatText(para)}
            </p>
          </MotionBlock>
        ))}
      </div>
    </div>
  );
};

export default MetricsGridSlide;
