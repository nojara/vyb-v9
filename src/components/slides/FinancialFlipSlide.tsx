import { ComputedSlide } from '@/data/slides';
import AnimatedBlock from '@/components/AnimatedBlock';
import { GlassCard } from '@/components/ui/GlassCard';
import { formatText } from '@/utils/formatText';

const FinancialFlipSlide = ({ slide, index }: { slide: ComputedSlide; index: number }) => {
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-8 items-stretch">
          {slide.pillars?.map((pillar, i) => (
            <AnimatedBlock key={i} slideIndex={index} delay={0.3 + i * 0.12}>
              <GlassCard accentColor={palette.primary}>
                <div className="absolute top-0 left-0 w-1 h-full rounded-l-full" style={{ backgroundColor: palette.primary }} />
                <h3 className="vyb-body-lg font-[var(--fw-body-strong)] mb-3 pl-4" style={{ color: palette.primary }}>
                  {pillar.title}
                </h3>
                <p className="vyb-body-sm opacity-70 pl-4" style={{ color: palette.text }}>
                  {pillar.text}
                </p>
              </GlassCard>
            </AnimatedBlock>
          ))}
        </div>

        {slide.body?.map((para, i) => (
          <AnimatedBlock key={i} slideIndex={index} delay={0.6 + i * 0.1}>
            <p className="vyb-body opacity-60 max-w-3xl" style={{ color: palette.text }}>
              {formatText(para)}
            </p>
          </AnimatedBlock>
        ))}
      </div>
    </div>
  );
};

export default FinancialFlipSlide;
