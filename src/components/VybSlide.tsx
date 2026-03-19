import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { ComputedSlideData } from '@/data/sections';
import { formatText } from '@/utils/formatText';

interface VybSlideProps {
  data: ComputedSlideData;
  onActive: (id: string) => void;
}

const ease = [0.22, 1, 0.36, 1] as const;

const getMotionVariants = (m: string): Record<string, any> => {
  const variants: Record<string, Record<string, any>> = {
    staggeredWords: { hidden: { y: '120%', rotateX: 3, opacity: 0 }, visible: { y: 0, rotateX: 0, opacity: 1, transition: { duration: 1.2, ease } } },
    maskRevealLR: { hidden: { clipPath: 'inset(0 100% 0 0)', opacity: 0 }, visible: { clipPath: 'inset(0 0% 0 0)', opacity: 1, transition: { duration: 1.4, ease } } },
    floatUp: { hidden: { y: 40, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 1, ease } } },
    typeIn: { hidden: { opacity: 0, x: -10 }, visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: 'easeOut' } } },
    splitLineReveal: { hidden: { clipPath: 'inset(50% 0 50% 0)', opacity: 0 }, visible: { clipPath: 'inset(0 0 0 0)', opacity: 1, transition: { duration: 1.2, ease } } },
    staggeredCascade: { hidden: { y: 30, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.8, delay: 0.15, ease } } },
    centerScaleReveal: { hidden: { scale: 0.92, opacity: 0 }, visible: { scale: 1, opacity: 1, transition: { duration: 1.2, ease } } },
    radialReveal: { hidden: { scale: 0.95, opacity: 0, filter: 'blur(8px)' }, visible: { scale: 1, opacity: 1, filter: 'blur(0px)', transition: { duration: 1, ease } } },
    verticalLift: { hidden: { y: 60, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 1, ease } } },
    lineByLineSlide: { hidden: { x: 40, opacity: 0 }, visible: { x: 0, opacity: 1, transition: { duration: 1, ease } } },
    waveReveal: { hidden: { y: 20, opacity: 0, skewY: 2 }, visible: { y: 0, opacity: 1, skewY: 0, transition: { duration: 1, ease } } },
    paragraphStep: { hidden: { y: 50, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 1.2, ease } } },
    wordBounce: { hidden: { y: 30, opacity: 0, scale: 0.95 }, visible: { y: 0, opacity: 1, scale: 1, transition: { duration: 0.8, ease: [0.34, 1.56, 0.64, 1] } } },
    depthReveal: { hidden: { scale: 1.1, opacity: 0, filter: 'blur(12px)' }, visible: { scale: 1, opacity: 1, filter: 'blur(0px)', transition: { duration: 1.4, ease } } },
    spotlightReveal: { hidden: { opacity: 0, filter: 'brightness(0.3)' }, visible: { opacity: 1, filter: 'brightness(1)', transition: { duration: 1.6, ease } } },
    diagonalEntrance: { hidden: { x: -30, y: 30, opacity: 0 }, visible: { x: 0, y: 0, opacity: 1, transition: { duration: 1, ease } } },
    twoPhaseReveal: { hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 1, delay: 0.2, ease } } },
    counterAnimation: { hidden: { scale: 0.8, opacity: 0, y: 20 }, visible: { scale: 1, opacity: 1, y: 0, transition: { duration: 0.8, ease } } },
  };
  return variants[m] || variants.floatUp;
};

const getInteractionClass = (interaction: string): string => {
  switch (interaction) {
    case 'letterSpacingHover': return 'hover:tracking-wider';
    case 'brightnessHover': case 'contrastHover': return 'hover:brightness-125';
    case 'underlineSweep': case 'underlineGrow': case 'underlineExpand': case 'accentUnderline': case 'underlineHighlight': case 'underlinePath': case 'glowUnderline':
      return 'hover:underline decoration-current underline-offset-8';
    case 'accentShift': case 'accentColorHover': return 'hover:opacity-90';
    default: return '';
  }
};

const getTypographyClass = (type: ComputedSlideData['type']): string => {
  switch (type) {
    case 'headline':
      return 'vyb-section-title';
    case 'subheader':
      return 'vyb-subtitle';
    case 'body':
      return 'vyb-body max-w-3xl';
  }
};

const VybSlide = ({ data, onActive }: VybSlideProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const yText = useTransform(scrollYProgress, [0, 1], [data.parallaxStrength * 0.5, -data.parallaxStrength * 0.5]);
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);
  const springY = useSpring(yText, { stiffness: 100, damping: 30 });

  const variants = getMotionVariants(data.motion);
  const interactionClass = getInteractionClass(data.interaction);
  const typographyClass = getTypographyClass(data.type);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) onActive(data.id); },
      { threshold: 0.6 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [data.id, onActive]);

  const heightClass = data.type === 'headline' ? 'min-h-screen' : 'min-h-[70vh]';

  return (
    <section
      ref={sectionRef}
      id={data.id}
      className={`relative ${heightClass} w-full flex flex-col items-center justify-center overflow-hidden`}
      style={{ backgroundColor: data.bgColor, color: data.textColor }}
    >
      <div className="grid-bg" style={{ color: data.textColor }} />
      <div className="spine-line" style={{ color: data.textColor }} />

      <motion.div
        style={{ y: springY, opacity }}
        className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12"
      >
        {/* Chapter kicker - only for headlines */}
        {data.type === 'headline' && (
          <motion.div
            initial={{ width: 0 }} whileInView={{ width: 'auto' }}
            viewport={{ once: true }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden mb-12"
          >
            <span className="vyb-label opacity-50 border-b pb-2" style={{ borderColor: 'currentColor' }}>
              {data.chapter}
            </span>
          </motion.div>
        )}

        <motion.div
          variants={variants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          className={`${typographyClass} ${interactionClass} cursor-default transition-all duration-500`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {formatText(data.text)}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default VybSlide;
