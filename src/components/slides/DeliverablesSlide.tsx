import { ComputedSlide } from '@/data/slides';
import AnimatedBlock from '@/components/AnimatedBlock';
import { formatText } from '@/utils/formatText';

const DeliverablesSlide = ({ slide, index }: { slide: ComputedSlide; index: number }) => {
  const { palette } = slide;

  return (
    <div className="relative w-full h-full flex items-center px-5 md:px-24 pt-24 pb-24">
      <div className="w-full max-w-6xl">
        {/* Standardized section label */}
        <AnimatedBlock slideIndex={index} delay={0}>
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
        </AnimatedBlock>

        {slide.headline && (
          <AnimatedBlock slideIndex={index} delay={0.12}>
            <h2
              className="vyb-section-title mb-[var(--space-kicker-to-title)]"
              style={{
                color: palette.primary,
                fontSize: 'clamp(24px, 6vw, 112px)',
              }}
            >
              {formatText(slide.headline)}
            </h2>
          </AnimatedBlock>
        )}

        {slide.subheadline && (
          <AnimatedBlock slideIndex={index} delay={0.22}>
            <p className="vyb-subtitle opacity-70 mb-8" style={{ color: palette.text }}>
              {slide.subheadline}
            </p>
          </AnimatedBlock>
        )}

        {/* Equal height cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8 items-stretch">
          {slide.pillars?.map((item, i) => (
            <AnimatedBlock key={i} slideIndex={index} delay={0.3 + i * 0.1}>
              <div
                className="text-center p-5 md:p-6 rounded-[var(--vyb-radius-card)] border backdrop-blur-md md:backdrop-blur-xl relative overflow-hidden h-full"
                style={{
                  borderColor: `${palette.primary}18`,
                  background: 'var(--vyb-glass-dark)',
                }}
              >
                <div
                  className="absolute top-0 left-0 right-0 h-px opacity-30 pointer-events-none"
                  style={{ background: `linear-gradient(90deg, transparent, ${palette.primary}40, transparent)` }}
                />
                <span className="vyb-metric block" style={{ color: palette.primary }}>
                  {item.title}
                </span>
                <span className="vyb-body-sm block mt-2 opacity-60 text-center" style={{ color: palette.text }}>
                  {item.text}
                </span>
              </div>
            </AnimatedBlock>
          ))}
        </div>

        {slide.body?.map((para, i) => (
          <AnimatedBlock key={i} slideIndex={index} delay={0.7 + i * 0.1}>
            <p className="vyb-body-sm max-w-3xl opacity-60" style={{ color: palette.text }}>
              {formatText(para)}
            </p>
          </AnimatedBlock>
        ))}
      </div>
    </div>
  );
};

export default DeliverablesSlide;
