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

const CardGridSlide = ({ slide: rawSlide, index }: { slide: ComputedSlide; index: number }) => {
  const slide = useTranslatedSlide(rawSlide);
  const { lang } = useLanguage();
  const { palette } = slide;
  const cols = (slide.pillars?.length || 4) >= 4 ? 'md:grid-cols-2 lg:grid-cols-4' : 'md:grid-cols-2 lg:grid-cols-3';

  return (
    <div
      className="relative w-full h-full flex items-center px-5 md:px-24 pt-24 pb-24 overflow-y-auto md:overflow-visible"
      dir={lang === 'ar' ? 'rtl' : 'ltr'}
    >
      <SlideBackground bgImage={slide.bgImage} videoSrc={slide.bgVideo} index={index} textColor={palette.text} />
      <div className="relative z-10 w-full max-w-6xl">
        <MotionBlock motionKey="spotlightFade" delay={0}>
          <span className="vyb-label inline-block opacity-40 mb-[var(--space-kicker-to-title)]" style={{ color: palette.text }}>
            {slide.section}
          </span>
        </MotionBlock>

        {slide.headline && (
          <MotionBlock motionKey="maskReveal" delay={0.1}>
            <h2 className="vyb-section-title mb-8" style={{ color: palette.primary }}>
              {formatText(slide.headline)}
            </h2>
          </MotionBlock>
        )}

        <div className="flex gap-8 items-start">
          <div className="flex-1">
            <div className={`grid grid-cols-1 sm:grid-cols-2 ${cols} gap-4 md:gap-6 items-start`}>
              {slide.pillars?.map((pillar, i) => (
                <MotionBlock key={i} motionKey="cardRise" delay={0.2 + i * 0.12} custom={i}>
                  <motion.div
                    whileHover={{
                      scale: 1.03,
                      y: -4,
                    }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="will-change-transform clean-hover"
                  >
                    <GlassCard accentColor={palette.accent}>
                      <h3 className="vyb-label mb-3 tracking-widest" style={{ color: palette.primary }}>
                        {pillar.title}
                      </h3>
                      <p className="vyb-body-sm opacity-70 leading-relaxed" style={{ color: palette.text }}>
                        {pillar.text}
                      </p>
                    </GlassCard>
                  </motion.div>
                </MotionBlock>
              ))}
            </div>

            {slide.body?.map((para, i) => (
              <MotionBlock key={i} motionKey="paragraphUnfold" delay={0.6 + i * 0.1} className="mt-8">
                <p className="vyb-body opacity-60 max-w-3xl" style={{ color: palette.text }}>
                  {formatText(para)}
                </p>
              </MotionBlock>
            ))}
          </div>

          {/* Side media */}
          <div className="hidden lg:flex lg:items-center flex-shrink-0 w-[480px]">
            {slide.media && slide.media.length > 0 ? (
              slide.media.map((m, i) =>
                m.videoSrc ? (
                  <VideoEmbed key={i} videoSrc={m.videoSrc} type={(m.type as 'vertical' | 'square') || 'vertical'} startTime={m.startTime} endTime={m.endTime} delay={0.6 + i * 0.2} />
                ) : null
              )
            ) : (
              <MediaPlaceholder
                style="square"
                accentColor={palette.accent}
                textColor={palette.text}
                label={slide.section?.toUpperCase()}
                delay={0.6}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardGridSlide;
