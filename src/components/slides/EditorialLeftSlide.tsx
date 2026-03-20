import { motion } from 'motion/react';
import { ComputedSlide } from '@/data/slides';
import MotionBlock from '@/components/MotionBlock';
import SlideBackground from '@/components/SlideBackground';
import DimLayer from '@/components/DimLayer';
import VideoEmbed from '@/components/VideoEmbed';
import MediaPlaceholder from '@/components/MediaPlaceholder';
import ScrollArrow from '@/components/ScrollArrow';
import { useTranslatedSlide } from '@/hooks/useTranslatedSlide';
import { useLanguage } from '@/context/LanguageContext';
import { formatText } from '@/utils/formatText';

const EditorialLeftSlide = ({ slide: rawSlide, index }: { slide: ComputedSlide; index: number }) => {
  const slide = useTranslatedSlide(rawSlide);
  const { lang } = useLanguage();
  const { palette } = slide;
  const hasMedia = slide.media && slide.media.length > 0;
  const hasBg = !!(slide.bgImage || slide.bgVideo);
  const hasNoVisualAnchor = !hasMedia && !slide.image;

  return (
    <div
      className="relative w-full h-full slide-content-safe overflow-y-auto md:overflow-visible"
      dir={lang === 'ar' ? 'rtl' : 'ltr'}
    >
      <SlideBackground bgImage={slide.bgImage} videoSrc={slide.bgVideo} index={index} textColor={palette.text} />
      {hasBg && <DimLayer opacity={0.5} mode="gradient" />}

      <div className="relative z-10 w-full h-full flex items-center">
        <div className="w-full grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6 md:gap-12 items-center max-w-6xl">
          {/* Text column — left-aligned always, centered on mobile for short text only */}
          <div className="text-left">
            {/* #5: Standardized section label */}
            <MotionBlock motionKey="spotlightFade" delay={0}>
              <motion.span
                className="vyb-label inline-block opacity-40 border-b pb-2 clean-hover"
                style={{
                  borderColor: `${palette.text}33`,
                  color: palette.text,
                  letterSpacing: '0.15em',
                  marginBottom: '16px',
                  display: 'inline-block',
                }}
                whileHover={{ opacity: 0.8 }}
                transition={{ duration: 0.3 }}
              >
                {slide.section}
              </motion.span>
            </MotionBlock>

            {/* #14: Fluid headline that won't overflow */}
            {slide.headline && (
              <MotionBlock motionKey="maskReveal" delay={0.15}>
                <h2
                  className="vyb-section-title mb-[var(--space-title-to-subtitle)]"
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

            {slide.subheadline && (
              <MotionBlock motionKey="diagIn" delay={0.3}>
                <p
                  className="vyb-subtitle opacity-80 mb-[var(--space-subtitle-to-body)]"
                  style={{ color: palette.text }}
                >
                  {formatText(slide.subheadline)}
                </p>
              </MotionBlock>
            )}

            {/* #4: Body paragraphs always left-aligned */}
            {slide.body?.map((para, i) => (
              <MotionBlock key={i} motionKey="editorialSweep" delay={0.4 + i * 0.15}>
                <motion.p
                  className="vyb-body opacity-70 mb-[var(--space-body-to-body)] text-left clean-hover"
                  style={{ color: palette.text, maxWidth: 'var(--mw-body)' }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.25 }}
                >
                  {formatText(para)}
                </motion.p>
              </MotionBlock>
            ))}

            {/* #8: Scroll arrow on text-only sections */}
            {hasNoVisualAnchor && (
              <ScrollArrow color={palette.text} delay={0.6 + (slide.body?.length || 0) * 0.15} />
            )}
          </div>

          {/* Media column */}
          <div className="hidden md:flex flex-col items-center gap-6 max-w-[40vw] overflow-hidden">
            {hasMedia ? (
              slide.media!.map((m, i) => (
                m.videoSrc ? (
                  <VideoEmbed key={i} videoSrc={m.videoSrc} type={m.type as 'vertical' | 'square'} startTime={m.startTime} delay={0.5 + i * 0.2} />
                ) : null
              ))
            ) : (
              <MediaPlaceholder
                style="editorial"
                accentColor={palette.accent}
                textColor={palette.text}
                label={slide.section?.toUpperCase()}
                delay={0.5}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditorialLeftSlide;
