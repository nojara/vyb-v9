import { motion } from 'motion/react';
import { ComputedSlide } from '@/data/slides';
import MotionBlock from '@/components/MotionBlock';
import SlideBackground from '@/components/SlideBackground';
import VideoEmbed from '@/components/VideoEmbed';
import MediaPlaceholder from '@/components/MediaPlaceholder';
import { GlassCard } from '@/components/ui/GlassCard';
import { useTranslatedSlide } from '@/hooks/useTranslatedSlide';
import { useLanguage } from '@/context/LanguageContext';
import { formatText } from '@/utils/formatText';

const EditorialSplitSlide = ({ slide: rawSlide, index }: { slide: ComputedSlide; index: number }) => {
  const slide = useTranslatedSlide(rawSlide);
  const { lang } = useLanguage();
  const { palette } = slide;
  const hasMedia = slide.media && slide.media.length > 0;

  return (
    <div className="relative w-full h-full flex items-center px-5 md:px-24 pt-24 pb-24 overflow-y-auto md:overflow-visible" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <SlideBackground bgImage={slide.bgImage} videoSrc={slide.bgVideo} index={index} textColor={palette.text} />

      <div className="relative z-10 w-full max-w-6xl">
        <MotionBlock motionKey="spotlightFade" delay={0}>
          <motion.span
            className="vyb-label opacity-40 mb-[var(--space-kicker-to-title)] block"
            style={{ color: palette.text }}
            whileHover={{ opacity: 0.8 }}
          >
            {slide.section}
          </motion.span>
        </MotionBlock>

        {slide.headline && (
          <MotionBlock motionKey="maskReveal" delay={0.1}>
            <motion.h2
              className="vyb-section-title mb-[var(--space-kicker-to-title)]"
              style={{ color: palette.primary }}
              whileHover={{ x: 5 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              {formatText(slide.headline)}
            </motion.h2>
          </MotionBlock>
        )}

        {slide.subheadline && (
          <MotionBlock motionKey="blurResolve" delay={0.2}>
            <p className="vyb-subtitle opacity-70 mb-10" style={{ color: palette.text }}>
              {slide.subheadline}
            </p>
          </MotionBlock>
        )}

        <div className={`grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8 mb-10`}>
          <div className="grid grid-cols-1 gap-6">
            {slide.pillars?.map((pillar, i) => (
              <MotionBlock key={i} motionKey="cardRise" delay={0.3 + i * 0.15}>
                <motion.div whileHover={{ scale: 1.02, y: -2 }} transition={{ duration: 0.3 }}>
                  <GlassCard className="relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full" style={{ backgroundColor: palette.primary }} />
                    <h3 className="vyb-body-lg font-[var(--fw-body-strong)] mb-3 pl-4" style={{ color: palette.primary }}>
                      {pillar.title}
                    </h3>
                    <p className="vyb-body-sm opacity-70 pl-4" style={{ color: palette.text }}>
                      {pillar.text}
                    </p>
                  </GlassCard>
                </motion.div>
              </MotionBlock>
            ))}
          </div>

          <div className="flex flex-col items-center gap-6">
            {hasMedia ? (
              slide.media!.map((m, i) => (
                m.videoSrc ? (
                  <VideoEmbed key={i} videoSrc={m.videoSrc} type={m.type as 'vertical' | 'square'} startTime={m.startTime} delay={0.5 + i * 0.2} />
                ) : null
              ))
            ) : (
              <MediaPlaceholder
                style="portrait"
                accentColor={palette.accent}
                textColor={palette.text}
                label="PREVIEW"
                delay={0.5}
              />
            )}
          </div>
        </div>

        {slide.body?.map((para, i) => (
          <MotionBlock key={i} motionKey="paragraphUnfold" delay={0.6 + i * 0.1}>
            <motion.p
              className="vyb-body opacity-60 max-w-3xl"
              style={{ color: palette.text }}
              whileHover={{ opacity: 0.9 }}
            >
              {formatText(para)}
            </motion.p>
          </MotionBlock>
        ))}
      </div>
    </div>
  );
};

export default EditorialSplitSlide;
