import { motion, useMotionValue, useSpring } from 'motion/react';
import { useRef, useCallback } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const SHAPE_ASSETS = [
  '1.png', '2.png', '3.png', '9.png', '10.png', '11.jpg', '12.png', '13.jpg', '14.jpg',
];

interface SlideBackgroundProps {
  bgImage?: string;
  videoSrc?: string;
  index: number;
  textColor: string;
}

const SlideBackground = ({ bgImage, videoSrc, index, textColor }: SlideBackgroundProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const prefersReduced = useReducedMotion();

  const isDarkText = textColor === '#0A0A0A' || textColor === '#000000';
  const blendMode = isDarkText ? 'mix-blend-multiply' : 'mix-blend-screen';
  const shapeOpacity = isDarkText ? 'opacity-15' : 'opacity-25';

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 40, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 20 });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (isMobile || prefersReduced) return;
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    mouseX.set(nx * 15);
    mouseY.set(ny * 10);
  }, [isMobile, prefersReduced, mouseX, mouseY]);

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  return (
    <>
      {/* ── Cinematic background image layers ── */}
      {bgImage && (
        <div
          ref={containerRef}
          className="absolute inset-0 z-0 overflow-hidden"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {/* Layer 0: Base image — 100vw×100vh cover */}
          {prefersReduced ? (
            <img
              src={bgImage}
              alt=""
              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
              style={{ opacity: isDarkText ? 0.15 : 0.25 }}
              loading="lazy"
            />
          ) : (
            <motion.img
              src={bgImage}
              alt=""
              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
              style={{ opacity: isDarkText ? 0.15 : 0.25 }}
              initial={{ scale: 1.15 }}
              whileInView={{ scale: 1.02 }}
              viewport={{ once: true }}
              transition={{ duration: 3, ease: [0.16, 1, 0.3, 1] }}
              loading="lazy"
            />
          )}

          {/* Layer 1: Parallax depth duplicate (desktop only) */}
          {!isMobile && !prefersReduced && (
            <motion.img
              src={bgImage}
              alt=""
              className="absolute inset-[-10%] w-[120%] h-[120%] object-cover pointer-events-none blur-[8px]"
              style={{
                opacity: isDarkText ? 0.08 : 0.12,
                x: springX,
                y: springY,
              }}
              loading="lazy"
            />
          )}

          {/* #3: Strong dark overlay for text readability on patterned backgrounds */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: isDarkText
                ? 'radial-gradient(ellipse at 50% 40%, transparent 20%, rgba(0,0,0,0.25) 100%), linear-gradient(180deg, rgba(255,255,255,0.1) 0%, transparent 40%, rgba(0,0,0,0.3) 100%)'
                : 'radial-gradient(ellipse at 50% 40%, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.55) 100%), linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.2) 40%, rgba(0,0,0,0.6) 100%)',
            }}
          />
        </div>
      )}

      {/* ── Background video ── */}
      {videoSrc && !videoSrc.includes('youtube') && (
        <div className="absolute inset-0 z-0">
          <video
            src={videoSrc}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-30 pointer-events-none"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/40" />
        </div>
      )}

      {/* ── Shape parallax motif (slides without bg) ── */}
      {!bgImage && !videoSrc && (
        prefersReduced ? (
          <div
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] max-w-[800px] pointer-events-none z-0 ${blendMode} ${shapeOpacity}`}
          >
            <img
              src={`/${SHAPE_ASSETS[index % SHAPE_ASSETS.length]}`}
              alt=""
              className="w-full h-auto object-contain blur-[3px]"
            />
          </div>
        ) : (
          <motion.div
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] max-w-[800px] pointer-events-none z-0 ${blendMode} ${shapeOpacity}`}
            initial={{ rotate: -8, scale: 0.9 }}
            whileInView={{ rotate: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
          >
            <img
              src={`/${SHAPE_ASSETS[index % SHAPE_ASSETS.length]}`}
              alt=""
              className="w-full h-auto object-contain blur-[3px]"
            />
          </motion.div>
        )
      )}
    </>
  );
};

export default SlideBackground;
