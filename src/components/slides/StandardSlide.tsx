import { ComputedSlide } from '@/data/slides';
import AnimatedBlock from '@/components/AnimatedBlock';
import ScrollArrow from '@/components/ScrollArrow';
import { formatText } from '@/utils/formatText';

const StandardSlide = ({ slide, index }: { slide: ComputedSlide; index: number }) => {
  const { palette } = slide;
  const hasNoVisualAnchor = !slide.image && (!slide.media || slide.media.length === 0);

  return (
    <div className="relative w-full h-full flex items-center px-5 md:px-24 pt-24 pb-24">
      <div className="max-w-4xl w-full">
        {/* Section label — standardized */}
        <AnimatedBlock slideIndex={index} delay={0}>
          <span
            className="vyb-label inline-block opacity-40 border-b pb-2"
            style={{
              borderColor: `${palette.text}33`,
              color: palette.text,
              letterSpacing: '0.15em',
              marginBottom: '16px',
              display: 'inline-block',
            }}
          >
            {slide.section}
          </span>
        </AnimatedBlock>

        {/* Headline — fluid */}
        {slide.headline && (
          <AnimatedBlock slideIndex={index} delay={0.15}>
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
          </AnimatedBlock>
        )}

        {/* Subheadline */}
        {slide.subheadline && (
          <AnimatedBlock slideIndex={index} delay={0.3}>
            <p
              className="vyb-subtitle opacity-80 mb-[var(--space-subtitle-to-body)]"
              style={{ color: palette.text }}
            >
              {formatText(slide.subheadline)}
            </p>
          </AnimatedBlock>
        )}

        {/* Body — left-aligned via vyb-body class */}
        {slide.body?.map((para, i) => (
          <AnimatedBlock key={i} slideIndex={index} delay={0.4 + i * 0.15}>
            <p
              className="vyb-body opacity-70 max-w-3xl mb-[var(--space-body-to-body)]"
              style={{ color: palette.text }}
            >
              {formatText(para)}
            </p>
          </AnimatedBlock>
        ))}

        {/* Image */}
        {slide.image && (
          <AnimatedBlock slideIndex={index} delay={0.6} className="mt-8">
            <img src={slide.image} alt="" className="w-48 h-48 object-cover rounded-2xl opacity-80" />
          </AnimatedBlock>
        )}

        {/* Scroll arrow on text-only sections */}
        {hasNoVisualAnchor && (
          <ScrollArrow color={palette.text} delay={0.6 + (slide.body?.length || 0) * 0.15} />
        )}
      </div>
    </div>
  );
};

export default StandardSlide;
