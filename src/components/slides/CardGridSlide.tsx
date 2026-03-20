import { motion } from 'motion/react';
import { ComputedSlide } from '@/data/slides';
import MotionBlock from '@/components/MotionBlock';
import SlideBackground from '@/components/SlideBackground';
import DimLayer from '@/components/DimLayer';
import VideoEmbed from '@/components/VideoEmbed';
import MediaPlaceholder from '@/components/MediaPlaceholder';
import { useTranslatedSlide } from '@/hooks/useTranslatedSlide';
import { useLanguage } from '@/context/LanguageContext';
import { formatText } from '@/utils/formatText';

const ACCENT_COLORS = ['var(--vyb-yellow)', 'var(--vyb-teal)', 'var(--vyb-cyan)', 'var(--vyb-coral)'];

const CardGridSlide = ({ slide: rawSlide, index }: { slide: ComputedSlide; index: number }) => {
  const slide = useTranslatedSlide(rawSlide);
  const { lang } = useLanguage();
  const { palette } = slide;
  const cols = (slide.pillars?.length || 4) >= 4 ? 'md:grid-cols-2 lg:grid-cols-4' : 'md:grid-cols-2 lg:grid-cols-3';
  const hasBg = !!(slide.bgImage || slide.bgVideo);

  return (
    <div
      className="relative w-full h-full flex items-center px-5 md:px-24 pt-24 pb-24 overflow-y-auto md:overflow-visible"
      dir={lang === 'ar' ? 'rtl' : 'ltr'}
    >
      <SlideBackground bgImage={slide.bgImage} videoSrc={slide.bgVideo} index={index} textColor={palette.text} />
      {hasBg && <DimLayer opacity={0.5} />}

      <div className="relative z-10 w-full max-w-6xl">
        {/* #5: Standardized section label */}
        <MotionBlock motionKey="spotlightFade" delay={0}>
          <span
            className="vyb-label inline-block opacity-40"
            style={{
              color: palette.text,
              letterSpacing: '0.15em',
              marginBottom: '16px',
              display: 'inline-block',
            }}
          >
            {slide.section}
          </span>
        </MotionBlock>

        {slide.headline && (
          <MotionBlock motionKey="maskReveal" delay={0.1}>
            <h2
              className="vyb-section-title mb-8"
              style={{
                color: palette.primary,
                maxWidth: 'var(--mw-title)',
                fontSize: 'clamp(24px, 6vw, 112px)',
              }}
            >
              {formatText(slide.headline)}
            </h2>
          </MotionBlock>
        )}

        <div className="flex gap-8 items-start">
          <div className="flex-1">
            {/* #7: Equal height cards with align-items: stretch */}
            <div className={`grid grid-cols-1 sm:grid-cols-2 ${cols} gap-4 md:gap-6 items-stretch`}>
              {slide.pillars?.map((pillar, i) => (
                <MotionBlock key={i} motionKey="cardRise" delay={0.2 + i * 0.12} custom={i}>
                  <motion.div
                    whileHover={{ scale: 1.03, y: -4 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="will-change-transform clean-hover h-full"
                  >
                    <div
                      className="glass-card-d2 h-full"
                      style={{ borderTop: `2px solid ${ACCENT_COLORS[i % ACCENT_COLORS.length]}` }}
                    >
                      <h3 className="vyb-label mb-3 tracking-widest" style={{ color: '#FFFFFF', fontWeight: 600 }}>
                        {pillar.title}
                      </h3>
                      <p className="vyb-body-sm leading-relaxed text-left" style={{ color: 'rgba(255,255,255,0.75)' }}>
                        {pillar.text}
                      </p>
                    </div>
                  </motion.div>
                </MotionBlock>
              ))}
            </div>

            {/* #4: Body text left-aligned */}
            {slide.body?.map((para, i) => (
              <MotionBlock key={i} motionKey="paragraphUnfold" delay={0.6 + i * 0.1} className="mt-8">
                <p className="vyb-body opacity-60 text-left" style={{ color: palette.text, maxWidth: 'var(--mw-body)' }}>
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
