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

const PortraitSplitSlide = ({ slide: rawSlide, index }: { slide: ComputedSlide; index: number }) => {
  const slide = useTranslatedSlide(rawSlide);
  const { lang } = useLanguage();
  const { palette } = slide;
  const hasMedia = slide.media && slide.media.length > 0;
  const hasBg = !!(slide.bgImage || slide.bgVideo);

  return (
    <div className="relative w-full h-full flex items-center px-5 md:px-24 pt-24 pb-24" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <SlideBackground bgImage={slide.bgImage} videoSrc={slide.bgVideo} index={index} textColor={palette.text} />
      {hasBg && <DimLayer opacity={0.45} />}

      <div className="relative z-10 w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 items-center">
        <div>
          <MotionBlock motionKey="spotlightFade" delay={0}>
            <motion.span
              className="vyb-label opacity-40 mb-[var(--space-kicker-to-title)] block"
              style={{ color: palette.text }}
              whileHover={{ opacity: 0.8, x: 3 }}
            >
              {slide.section}
            </motion.span>
          </MotionBlock>

          {slide.headline && (
            <MotionBlock motionKey="heroLift" delay={0.15}>
              <h2
                className="vyb-section-title mb-[var(--space-title-to-subtitle)]"
                style={{ color: palette.primary, maxWidth: 'var(--mw-title)' }}
              >
                {formatText(slide.headline)}
              </h2>
            </MotionBlock>
          )}

          {slide.subheadline && (
            <MotionBlock motionKey="blurResolve" delay={0.3}>
              <p className="vyb-subtitle opacity-70 mb-[var(--space-subtitle-to-body)]" style={{ color: palette.text }}>
                {slide.subheadline}
              </p>
            </MotionBlock>
          )}

          {slide.body?.map((para, i) => (
            <MotionBlock key={i} motionKey="editorialSweep" delay={0.4 + i * 0.15}>
              <motion.p
                className="vyb-body opacity-70 mb-[var(--space-body-to-body)]"
                style={{ color: palette.text, maxWidth: 'var(--mw-body)' }}
                whileHover={{ opacity: 1, x: 3 }}
                transition={{ duration: 0.25 }}
              >
                {formatText(para)}
              </motion.p>
            </MotionBlock>
          ))}
        </div>

        <div className="hidden md:flex flex-col items-center md:items-end gap-6">
          {slide.image && (
            <MotionBlock motionKey="portraitFade" delay={0.3}>
              <motion.img
                src={slide.image}
                alt={slide.headline || ''}
                className="w-64 h-80 md:w-80 md:h-[28rem] object-cover rounded-[var(--vyb-radius-card)] shadow-[var(--vyb-shadow-soft)]"
                whileHover={{ scale: 1.03, rotate: 1 }}
                transition={{ duration: 0.4 }}
              />
            </MotionBlock>
          )}

          {!slide.image && hasMedia ? (
            slide.media!.map((m, i) => (
              m.videoSrc ? (
                <VideoEmbed key={i} videoSrc={m.videoSrc} type={m.type as 'vertical' | 'square'} startTime={m.startTime} delay={0.4 + i * 0.2} />
              ) : null
            ))
          ) : !slide.image && !hasMedia ? (
            <MediaPlaceholder
              style="portrait"
              accentColor={palette.accent}
              textColor={palette.text}
              label={slide.headline?.toUpperCase()}
              delay={0.4}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default PortraitSplitSlide;
