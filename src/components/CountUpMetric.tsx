import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';

interface CountUpMetricProps {
  value: string;
  label: string;
  primaryColor: string;
  textColor: string;
  delay?: number;
  duration?: number;
}

/** Extracts leading number from a stat value like "$4.96B" or "25.5%" */
function parseNumeric(val: string): { prefix: string; num: number; suffix: string } {
  const match = val.match(/^([^0-9]*)([0-9]+(?:\.[0-9]+)?)(.*)$/);
  if (!match) return { prefix: '', num: 0, suffix: val };
  return { prefix: match[1], num: parseFloat(match[2]), suffix: match[3] };
}

const CountUpMetric = ({
  value,
  label,
  primaryColor,
  textColor,
  delay = 0,
  duration = 1.2,
}: CountUpMetricProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10%' });
  const [display, setDisplay] = useState(value);
  const hasAnimated = useRef(false);

  const { prefix, num, suffix } = parseNumeric(value);
  const hasDecimals = value.includes('.');
  const decimalPlaces = hasDecimals ? (value.match(/\.(\d+)/)?.[1]?.length || 0) : 0;

  useEffect(() => {
    if (!isInView || hasAnimated.current) return;
    hasAnimated.current = true;

    if (num === 0) {
      setDisplay(value);
      return;
    }

    const startTime = performance.now() + delay * 1000;
    const durationMs = duration * 1000;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      if (elapsed < 0) {
        requestAnimationFrame(tick);
        return;
      }
      const progress = Math.min(elapsed / durationMs, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * num;
      setDisplay(`${prefix}${current.toFixed(decimalPlaces)}${suffix}`);
      if (progress < 1) requestAnimationFrame(tick);
      else setDisplay(value); // ensure exact final value
    };

    requestAnimationFrame(tick);
  }, [isInView, num, prefix, suffix, value, delay, duration, decimalPlaces]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className="text-center p-6 md:p-8 rounded-[var(--vyb-radius-card)] border backdrop-blur-md md:backdrop-blur-xl relative overflow-hidden group"
      style={{ borderColor: `${primaryColor}15`, background: `${primaryColor}06` }}
    >
      {/* Glow on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: `radial-gradient(circle at 50% 50%, ${primaryColor}12, transparent 70%)` }}
      />

      {/* Pulse flash on count complete */}
      {isInView && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.15, 0] }}
          transition={{ duration: 0.8, delay: delay + duration }}
          className="absolute inset-0 pointer-events-none rounded-[var(--vyb-radius-card)]"
          style={{ backgroundColor: primaryColor }}
        />
      )}

      <span className="vyb-metric block relative z-10" style={{ color: primaryColor }}>
        {display}
      </span>
      <span
        className="vyb-label block mt-3 opacity-50 max-w-[220px] mx-auto relative z-10 leading-relaxed"
        style={{ color: textColor }}
      >
        {label}
      </span>
    </motion.div>
  );
};

export default CountUpMetric;
