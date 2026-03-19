import { ComputedSlide } from '@/data/slides';
import AnimatedBlock from '@/components/AnimatedBlock';
import { formatText } from '@/utils/formatText';

const StandardSlide = ({ slide, index }: { slide: ComputedSlide; index: number }) => {
  const { palette } = slide;

  return (
    <div className="relative w-full h-full flex items-center px-5 md:px-24 pt-20 pb-16">
      <div className="max-w-4xl w-full">
        {/* Section label / kicker */}
        <AnimatedBlock slideIndex={index} delay={0}>
          <span
            className="vyb-label inline-block opacity-40 mb-[var(--space-kicker-to-title)] border-b pb-2"
            style={{ borderColor: `${palette.text}33`, color: palette.text }}
          >
            {slide.section}
          </span>
        </AnimatedBlock>

        {/* Headline */}
        {slide.headline && (
          <AnimatedBlock slideIndex={index} delay={0.15}>
            <h2
              className="vyb-section-title mb-[var(--space-title-to-subtitle)]"
              style={{ color: palette.primary }}
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

        {/* Body */}
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
      </div>
    </div>
  );
};

export default StandardSlide;
