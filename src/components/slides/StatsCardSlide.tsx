import { ComputedSlide } from '@/data/slides';
import AnimatedBlock from '@/components/AnimatedBlock';
import { formatText } from '@/utils/formatText';

const StatsCardSlide = ({ slide, index }: { slide: ComputedSlide; index: number }) => {
  const { palette } = slide;

  return (
    <div className="relative w-full h-full flex items-center px-5 md:px-24 pt-20 pb-16">
      <div className="w-full max-w-6xl">
        {slide.headline && (
          <AnimatedBlock slideIndex={index} delay={0}>
            <h2 className="vyb-section-title mb-[var(--space-kicker-to-title)]" style={{ color: palette.primary }}>
              {formatText(slide.headline)}
            </h2>
          </AnimatedBlock>
        )}

        {slide.subheadline && (
          <AnimatedBlock slideIndex={index} delay={0.12}>
            <p className="vyb-subtitle opacity-70 mb-10" style={{ color: palette.text }}>
              {slide.subheadline}
            </p>
          </AnimatedBlock>
        )}

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {slide.stats?.map((stat, i) => (
            <AnimatedBlock key={i} slideIndex={index} delay={0.2 + i * 0.12}>
              <div
                className="text-center p-5 md:p-8 rounded-[var(--vyb-radius-card)] border backdrop-blur-md md:backdrop-blur-xl relative overflow-hidden"
                style={{
                  borderColor: `${palette.primary}15`,
                  background: 'var(--vyb-glass-dark)',
                }}
              >
                <div
                  className="absolute top-0 left-0 right-0 h-px opacity-30 pointer-events-none"
                  style={{ background: `linear-gradient(90deg, transparent, ${palette.primary}40, transparent)` }}
                />
                <span className="vyb-metric block" style={{ color: palette.primary }}>
                  {stat.value}
                </span>
                <span className="vyb-label block mt-3 opacity-50 max-w-[200px] mx-auto" style={{ color: palette.text }}>
                  {stat.label}
                </span>
              </div>
            </AnimatedBlock>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsCardSlide;
