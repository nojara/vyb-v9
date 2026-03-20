import { useRef } from 'react';
import { motion } from 'motion/react';
import { ComputedSlide } from '@/data/slides';
import MotionBlock from '@/components/MotionBlock';
import SlideBackground from '@/components/SlideBackground';
import DimLayer from '@/components/DimLayer';
import MediaPlaceholder from '@/components/MediaPlaceholder';
import { useMouseParallax } from '@/hooks/useMouseParallax';
import { useTranslatedSlide } from '@/hooks/useTranslatedSlide';
import { useLanguage } from '@/context/LanguageContext';
import { formatText } from '@/utils/formatText';
import { ChevronDown } from 'lucide-react';

const HeroCenterSlide = ({ slide: rawSlide, index }: { slide: ComputedSlide; index: number }) => {
  const slide = useTranslatedSlide(rawSlide);
  const { lang } = useLanguage();
  const { palette } = slide;
  const containerRef = useRef<HTMLDivElement>(null);
  const mouse = useMouseParallax(containerRef, 30);
  const hasBg = !!(slide.bgImage || slide.bgVideo);

  return (
    <div ref={containerRef} className="relative w-full h-full flex flex-col items-center justify-center text-center px-5 md:px-8 pt-24 pb-24 no-glitch overflow-hidden" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <SlideBackground bgImage={slide.bgImage} videoSrc={slide.bgVideo} index={index} textColor={palette.text} />
      {hasBg && <DimLayer opacity={0.45} mode="gradient" />}

      <div className="relative z-10 w-full max-w-[90vw] flex flex-col items-center">
        {/* Floating accent orb */}
        <motion.div
          className="absolute -top-24 -right-32 w-64 h-64 rounded-full pointer-events-none opacity-20 blur-[80px]"
          style={{ backgroundColor: palette.accent }}
          animate={{ x: mouse.x * 1.5, y: mouse.y * 1.5 }}
          transition={{ type: 'spring', stiffness: 50, damping: 30 }}
        />

        <MotionBlock motionKey="spotlightFade" delay={0.2} className="mb-[var(--space-kicker-to-title)]">
          <motion.span
            className="vyb-label inline-block px-6 py-2 rounded-[var(--vyb-radius-chip)] backdrop-blur-md border"
            style={{ borderColor: `${palette.primary}55`, color: palette.primary }}
            whileHover={{ scale: 1.05, borderColor: `${palette.primary}88` }}
            transition={{ duration: 0.3 }}
          >
            {slide.body?.[0] || 'MOBILY × NOJARA STUDIOS × ELEVATE'}
          </motion.span>
        </MotionBlock>

        {/* #1 #2 #14: Hero title — fluid, centered, no overflow */}
        <MotionBlock motionKey="heroLift" delay={0.4}>
          <motion.h1
            className="vyb-hero-title text-center w-full"
            style={{
              color: palette.primary,
              fontSize: 'clamp(40px, 10vw, 160px)',
              maxWidth: '100%',
              overflowWrap: 'break-word',
              wordBreak: 'break-word',
            }}
            animate={{ x: mouse.x * 0.4, y: mouse.y * 0.3 }}
            transition={{ type: 'spring', stiffness: 80, damping: 40 }}
          >
            {formatText(slide.headline || '')}
          </motion.h1>
        </MotionBlock>

        {slide.subheadline && (
          <MotionBlock motionKey="blurResolve" delay={0.6} className="mt-[var(--space-title-to-subtitle)]">
            <motion.p
              className="vyb-subtitle opacity-80"
              style={{ color: palette.text }}
              animate={{ x: -mouse.x * 0.2, y: -mouse.y * 0.15 }}
              transition={{ type: 'spring', stiffness: 60, damping: 35 }}
            >
              {slide.subheadline}
            </motion.p>
          </MotionBlock>
        )}

        <div className="mt-10 flex justify-center">
          <MediaPlaceholder
            style="cinematic"
            accentColor={palette.accent}
            textColor={palette.text}
            label="WATCH TEASER"
            delay={0.7}
            videoSrc={slide.bgVideo}
          />
        </div>

        {/* #12: Changed swipe hint to scroll with down arrow */}
        <MotionBlock motionKey="ctaBreathe" delay={0.9} className="mt-[var(--space-body-to-cta)]">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            className="vyb-ui-mono opacity-50 flex items-center gap-2"
            style={{ color: palette.text }}
          >
            <ChevronDown size={14} />
            SCROLL TO EXPLORE
            <ChevronDown size={14} />
          </motion.div>
        </MotionBlock>
      </div>
    </div>
  );
};

export default HeroCenterSlide;
