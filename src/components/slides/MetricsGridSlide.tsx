import { ComputedSlide } from '@/data/slides';
import MotionBlock from '@/components/MotionBlock';
import SlideBackground from '@/components/SlideBackground';
import DimLayer from '@/components/DimLayer';
import CountUpMetric from '@/components/CountUpMetric';
import { useTranslatedSlide } from '@/hooks/useTranslatedSlide';
import { useLanguage } from '@/context/LanguageContext';
import { formatText } from '@/utils/formatText';

const MetricsGridSlide = ({ slide: rawSlide, index }: { slide: ComputedSlide; index: number }) => {
  const slide = useTranslatedSlide(rawSlide);
  const { lang } = useLanguage();
  const { palette } = slide;
  const hasBg = !!(slide.bgImage || slide.bgVideo);

  return (
    <div
      className="relative w-full h-full flex items-center px-5 md:px-24 pt-24 pb-24 overflow-y-auto md:overflow-visible"
      dir={lang === 'ar' ? 'rtl' : 'ltr'}
    >
      <SlideBackground bgImage={slide.bgImage} videoSrc={slide.bgVideo} index={index} textColor={palette.text} />
      {hasBg && <DimLayer opacity={0.45} />}

      <div className="relative z-10 w-full max-w-6xl">
        {slide.headline && (
          <MotionBlock motionKey="heroLift" delay={0}>
            <h2 className="vyb-section-title mb-[var(--space-kicker-to-title)]" style={{ color: palette.primary }}>
              {formatText(slide.headline)}
            </h2>
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
            <CountUpMetric
              key={i}
              value={stat.value}
              label={stat.label}
              primaryColor={palette.primary}
              textColor={palette.text}
              delay={0.2 + i * 0.15}
              duration={1.0 + i * 0.1}
            />
          ))}
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
