import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import MotionBlock from './MotionBlock';

// Visual placeholders per layout style
type PlaceholderStyle = 
  | 'cinematic'    // 16:9 widescreen with film grain
  | 'portrait'     // 9:16 tall 
  | 'square'       // 1:1
  | 'editorial'    // 4:3 classic
  | 'panoramic'    // 21:9 ultra-wide
  | 'mosaic';      // 2-up grid

interface MediaPlaceholderProps {
  style?: PlaceholderStyle;
  accentColor: string;
  textColor: string;
  label?: string;
  delay?: number;
  videoSrc?: string;
  imageSrc?: string;
}

const ASPECT_CLASSES: Record<PlaceholderStyle, string> = {
  cinematic: 'aspect-video w-full max-w-[480px]',
  portrait: 'aspect-[9/16] w-full max-w-[240px]',
  square: 'aspect-square w-full max-w-[320px]',
  editorial: 'aspect-[4/3] w-full max-w-[400px]',
  panoramic: 'aspect-[21/9] w-full max-w-[560px]',
  mosaic: 'aspect-[3/2] w-full max-w-[420px]',
};

const MediaPlaceholder = ({
  style = 'cinematic',
  accentColor,
  textColor,
  label,
  delay = 0.4,
  videoSrc,
  imageSrc,
}: MediaPlaceholderProps) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const hasContent = !!videoSrc || !!imageSrc;

  return (
    <>
      <MotionBlock motionKey="cardRise" delay={delay}>
        <motion.div
          onClick={() => setIsFullscreen(true)}
          className={`relative group overflow-hidden rounded-[var(--vyb-radius-card)] border backdrop-blur-xl cursor-pointer ${ASPECT_CLASSES[style]}`}
          style={{ borderColor: `${accentColor}25`, background: `${accentColor}08` }}
          whileHover={{ scale: 1.03, boxShadow: `0 20px 60px -15px ${accentColor}30` }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Video content */}
          {videoSrc && (
            <video
              src={videoSrc}
              autoPlay loop muted playsInline
              className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-500"
            />
          )}

          {/* Image content */}
          {imageSrc && !videoSrc && (
            <img
              src={imageSrc}
              alt={label || ''}
              className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-500"
            />
          )}

          {/* Visual placeholder pattern when no content */}
          {!hasContent && (
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Animated gradient bg */}
              <motion.div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(135deg, ${accentColor}12 0%, ${accentColor}06 50%, ${accentColor}18 100%)`,
                }}
                animate={{
                  backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
                }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              />
              {/* Grid pattern */}
              <div
                className="absolute inset-0 opacity-[0.06]"
                style={{
                  backgroundImage: `linear-gradient(${accentColor}40 1px, transparent 1px), linear-gradient(90deg, ${accentColor}40 1px, transparent 1px)`,
                  backgroundSize: '24px 24px',
                }}
              />
              {/* Center play/media icon */}
              <motion.div
                className="relative z-10 flex flex-col items-center gap-3"
                animate={{ opacity: [0.4, 0.7, 0.4] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center backdrop-blur-md border"
                  style={{ borderColor: `${accentColor}30`, background: `${accentColor}15` }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill={accentColor} opacity={0.7}>
                    <path d="M5 3l14 9-14 9V3z" />
                  </svg>
                </div>
                {label && (
                  <span className="vyb-label text-[10px] tracking-widest opacity-50" style={{ color: textColor }}>
                    {label}
                  </span>
                )}
              </motion.div>
            </div>
          )}

          {/* Hover overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/20 backdrop-blur-[2px]">
            <motion.div
              className="w-14 h-14 rounded-full flex items-center justify-center border"
              style={{ borderColor: `${accentColor}50`, background: `${accentColor}20` }}
              whileHover={{ scale: 1.15 }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={textColor} strokeWidth="2">
                <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
              </svg>
            </motion.div>
          </div>

          {/* Corner accent */}
          <div className="absolute top-3 left-3 w-5 h-5 border-l-2 border-t-2 opacity-20" style={{ borderColor: accentColor }} />
          <div className="absolute bottom-3 right-3 w-5 h-5 border-r-2 border-b-2 opacity-20" style={{ borderColor: accentColor }} />
        </motion.div>
      </MotionBlock>

      {/* Fullscreen modal */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 backdrop-blur-3xl flex items-center justify-center p-8"
            style={{ zIndex: 9999 }}
            onClick={() => setIsFullscreen(false)}
          >
            <button
              onClick={() => setIsFullscreen(false)}
              className="absolute top-8 right-8 text-white hover:text-white/50 transition-colors z-10"
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative max-w-[90vw] max-h-[85vh] overflow-hidden rounded-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {videoSrc ? (
                <video
                  src={videoSrc}
                  autoPlay controls playsInline
                  className="w-full max-h-[85vh] rounded-2xl shadow-2xl"
                />
              ) : imageSrc ? (
                <img
                  src={imageSrc}
                  alt={label || ''}
                  className="w-full max-h-[85vh] rounded-2xl shadow-2xl object-contain"
                />
              ) : (
                <div
                  className="w-[80vw] aspect-video rounded-2xl flex items-center justify-center"
                  style={{ background: `linear-gradient(135deg, ${accentColor}15, ${accentColor}08)` }}
                >
                  <span className="vyb-label opacity-30 text-white">MEDIA PREVIEW</span>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MediaPlaceholder;
