import { motion } from 'motion/react';
import { ComputedSlide } from '@/data/slides';
import MotionBlock from '@/components/MotionBlock';
import SlideBackground from '@/components/SlideBackground';
import DimLayer from '@/components/DimLayer';
import { useTranslatedSlide } from '@/hooks/useTranslatedSlide';
import { useLanguage } from '@/context/LanguageContext';
import { formatText } from '@/utils/formatText';
import { Youtube, Instagram } from 'lucide-react';

const TikTokIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.75a8.18 8.18 0 004.76 1.52V6.84a4.84 4.84 0 01-1-.15z" />
  </svg>
);

const ArtistGridSlide = ({ slide: rawSlide, index }: { slide: ComputedSlide; index: number }) => {
  const slide = useTranslatedSlide(rawSlide);
  const { lang } = useLanguage();
  const { palette } = slide;
  const artists = slide.artistData || [];
  const hasBg = !!(slide.bgImage || slide.bgVideo);

  return (
    <div className="relative w-full h-full flex items-start px-4 md:px-24 pt-24 pb-24 overflow-y-auto" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <SlideBackground bgImage={slide.bgImage} videoSrc={slide.bgVideo} index={index} textColor={palette.text} />
      {hasBg && <DimLayer opacity={0.45} />}

      <div className="relative z-10 w-full max-w-6xl mx-auto">
        <MotionBlock motionKey="spotlightFade" delay={0}>
          <span className="vyb-label inline-block opacity-40 mb-2" style={{ color: palette.text }}>
            {slide.section}
          </span>
        </MotionBlock>

        {slide.headline && (
          <MotionBlock motionKey="maskReveal" delay={0.1}>
            <h2 className="vyb-section-title mb-2" style={{ color: palette.primary }}>
              {formatText(slide.headline)}
            </h2>
          </MotionBlock>
        )}

        {slide.subheadline && (
          <MotionBlock motionKey="blurResolve" delay={0.2}>
            <p className="vyb-subtitle opacity-60 mb-6" style={{ color: palette.text }}>
              {slide.subheadline}
            </p>
          </MotionBlock>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 md:gap-4">
          {artists.map((artist, i) => (
            <MotionBlock key={artist.name} motionKey="cardRise" delay={0.25 + i * 0.04} custom={i}>
              <motion.div
                className="glass-card-d2 flex flex-col items-center gap-2"
                style={{ padding: '12px 16px' }}
                whileHover={{
                  scale: 1.06,
                  y: -4,
                  borderColor: `${palette.accent}50`,
                  boxShadow: `0 12px 40px -10px ${palette.accent}30`,
                }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Artist initial avatar */}
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{
                    background: 'rgba(255,255,255,0.1)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '14px',
                    color: '#FFFFFF',
                  }}
                >
                  {artist.name.charAt(0)}
                </div>

                <span
                  className="vyb-label text-center leading-tight text-[11px] md:text-xs"
                  style={{ color: '#FFFFFF', fontWeight: 600 }}
                >
                  {artist.name}
                </span>

                <div className="flex gap-2 mt-1">
                  {artist.tiktok && (
                    <a href={artist.tiktok} target="_blank" rel="noopener noreferrer" className="opacity-50 hover:opacity-100 transition-opacity" style={{ color: palette.text }}>
                      <TikTokIcon size={14} />
                    </a>
                  )}
                  {artist.youtube && (
                    <a href={artist.youtube} target="_blank" rel="noopener noreferrer" className="opacity-50 hover:opacity-100 transition-opacity" style={{ color: palette.text }}>
                      <Youtube size={14} />
                    </a>
                  )}
                  {artist.instagram && (
                    <a href={artist.instagram} target="_blank" rel="noopener noreferrer" className="opacity-50 hover:opacity-100 transition-opacity" style={{ color: palette.text }}>
                      <Instagram size={14} />
                    </a>
                  )}
                </div>
              </motion.div>
            </MotionBlock>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArtistGridSlide;
