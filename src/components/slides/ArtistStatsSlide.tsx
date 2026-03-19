import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { ComputedSlide } from '@/data/slides';
import MotionBlock from '@/components/MotionBlock';
import SlideBackground from '@/components/SlideBackground';
import DimLayer from '@/components/DimLayer';
import { useTranslatedSlide } from '@/hooks/useTranslatedSlide';
import { useLanguage } from '@/context/LanguageContext';
import { useSlideActive } from '@/context/SlideActiveContext';
import { formatText } from '@/utils/formatText';
import { Youtube, Instagram } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from 'recharts';

const TikTokIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.75a8.18 8.18 0 004.76 1.52V6.84a4.84 4.84 0 01-1-.15z" />
  </svg>
);

const PLATFORM_DATA = [
  { name: 'TikTok', count: 17, color: '#FF0050' },
  { name: 'YouTube', count: 18, color: '#FF0000' },
  { name: 'Instagram', count: 18, color: '#E1306C' },
];

const PLATFORM_ICONS: Record<string, React.ReactNode> = {
  TikTok: <TikTokIcon size={18} />,
  YouTube: <Youtube size={18} />,
  Instagram: <Instagram size={18} />,
};

function AnimatedCounter({ target, isActive }: { target: number; isActive: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isActive) { setCount(0); return; }
    let frame: number;
    const duration = 1200;
    const start = performance.now();
    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, isActive]);

  return <>{count}</>;
}

const ArtistStatsSlide = ({ slide: rawSlide, index }: { slide: ComputedSlide; index: number }) => {
  const slide = useTranslatedSlide(rawSlide);
  const { lang } = useLanguage();
  const { palette } = slide;
  const isActive = useSlideActive();
  const hasBg = !!(slide.bgImage || slide.bgVideo);

  return (
    <div className="relative w-full h-full flex items-center px-5 md:px-24 pt-24 pb-24 overflow-y-auto md:overflow-visible" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <SlideBackground bgImage={slide.bgImage} videoSrc={slide.bgVideo} index={index} textColor={palette.text} />
      {hasBg && <DimLayer opacity={0.45} />}

      <div className="relative z-10 w-full max-w-5xl mx-auto">
        {slide.headline && (
          <MotionBlock motionKey="heroLift" delay={0}>
            <h2 className="vyb-section-title mb-2" style={{ color: palette.primary }}>
              {formatText(slide.headline)}
            </h2>
          </MotionBlock>
        )}

        {slide.subheadline && (
          <MotionBlock motionKey="blurResolve" delay={0.1}>
            <p className="vyb-subtitle opacity-60 mb-10" style={{ color: palette.text }}>
              {slide.subheadline}
            </p>
          </MotionBlock>
        )}

        {/* Animated stat counters */}
        <div className="grid grid-cols-3 gap-4 md:gap-8 mb-10">
          {(slide.stats || []).map((stat, i) => (
            <MotionBlock key={i} motionKey="metricCountIn" delay={0.2 + i * 0.15}>
              <motion.div
                className="glass-card-d2 text-center"
                whileHover={{ scale: 1.06, y: -3 }}
                transition={{ duration: 0.3 }}
              >
                <span className="vyb-metric block" style={{ color: palette.primary }}>
                  <AnimatedCounter target={parseInt(stat.value)} isActive={isActive} />
                </span>
                <span className="vyb-label block mt-2 opacity-50" style={{ color: palette.text }}>
                  {stat.label}
                </span>
              </motion.div>
            </MotionBlock>
          ))}
        </div>

        {/* Platform distribution chart */}
        <MotionBlock motionKey="cardRise" delay={0.7}>
          <div className="glass-card-d2">
            <p className="vyb-label opacity-40 mb-4" style={{ color: palette.text }}>
              PLATFORM DISTRIBUTION
            </p>
            <div className="h-[160px] md:h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={PLATFORM_DATA} layout="vertical" barCategoryGap="28%">
                  <XAxis type="number" hide domain={[0, 20]} />
                  <YAxis
                    type="category"
                    dataKey="name"
                    width={80}
                    tick={{ fill: palette.text, opacity: 0.6, fontSize: 12, fontFamily: 'var(--font-body)' }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Bar dataKey="count" radius={[0, 8, 8, 0]} animationDuration={1400} animationBegin={600}>
                    {PLATFORM_DATA.map((entry, i) => (
                      <Cell key={i} fill={entry.color} fillOpacity={0.85} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="flex justify-center gap-6 mt-4">
              {PLATFORM_DATA.map((p) => (
                <div key={p.name} className="flex items-center gap-2 opacity-60" style={{ color: p.color }}>
                  {PLATFORM_ICONS[p.name]}
                  <span className="text-xs font-medium" style={{ color: palette.text }}>
                    {p.count}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </MotionBlock>
      </div>
    </div>
  );
};

export default ArtistStatsSlide;
