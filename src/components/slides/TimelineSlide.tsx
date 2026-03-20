import { ComputedSlide } from '@/data/slides';
import AnimatedBlock from '@/components/AnimatedBlock';
import { useTranslatedSlide } from '@/hooks/useTranslatedSlide';
import { useLanguage } from '@/context/LanguageContext';
import { formatText } from '@/utils/formatText';

const TimelineSlide = ({ slide: rawSlide, index }: { slide: ComputedSlide; index: number }) => {
  const slide = useTranslatedSlide(rawSlide);
  const { lang } = useLanguage();
  const { palette } = slide;

  return (
    <div className="relative w-full h-full flex items-center px-5 md:px-24 pt-24 pb-24" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <div className="w-full max-w-5xl">
        <AnimatedBlock slideIndex={index} delay={0}>
          <span
            className="vyb-label inline-block opacity-40"
            style={{ color: palette.text, letterSpacing: '0.15em', marginBottom: '16px', display: 'inline-block' }}
          >
            {slide.section}
          </span>
        </AnimatedBlock>

        {slide.headline && (
          <AnimatedBlock slideIndex={index} delay={0.1}>
            <h2 className="vyb-section-title mb-2" style={{ color: palette.primary, fontSize: 'clamp(24px, 6vw, 112px)' }}>
              {formatText(slide.headline)}
            </h2>
          </AnimatedBlock>
        )}

        {slide.subheadline && (
          <AnimatedBlock slideIndex={index} delay={0.18}>
            <p className="vyb-subtitle opacity-60 mb-8" style={{ color: palette.text }}>
              {slide.subheadline}
            </p>
          </AnimatedBlock>
        )}

        <div className="relative pl-8 border-l" style={{ borderColor: `${palette.primary}33` }}>
          {slide.timeline?.map((entry, i) => (
            <AnimatedBlock key={i} slideIndex={index} delay={0.25 + i * 0.15} className="mb-6 last:mb-0 relative">
              <div className="absolute -left-[calc(2rem+5px)] top-1 w-2.5 h-2.5 rounded-full" style={{ backgroundColor: palette.primary }} />
              
              <span className="vyb-label opacity-60 block mb-1" style={{ color: palette.primary }}>
                {entry.time}
              </span>
              <h3 className="vyb-body-lg font-[var(--fw-body-strong)] mb-2" style={{ color: palette.text }}>
                {entry.title}
              </h3>
              <p className="vyb-body-sm opacity-60 max-w-2xl" style={{ color: palette.text }}>
                {entry.text}
              </p>
            </AnimatedBlock>
          ))}
        </div>

        {slide.body?.map((para, i) => (
          <AnimatedBlock key={i} slideIndex={index} delay={0.8 + i * 0.1} className="mt-6">
            <p className="vyb-body-sm opacity-50 max-w-2xl" style={{ color: palette.text }}>
              {formatText(para)}
            </p>
          </AnimatedBlock>
        ))}
      </div>
    </div>
  );
};

export default TimelineSlide;
