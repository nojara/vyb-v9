import { useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '@/context/LanguageContext';
import { formatText } from '@/utils/formatText';

interface LoaderScreenProps {
  onStart: () => void;
}

const LoaderScreen = ({ onStart }: LoaderScreenProps) => {
  const { lang } = useLanguage();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    vid.volume = 0;
    vid.muted = false;
    const start = performance.now();
    const duration = 2000;
    const target = 0.05;
    const fade = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      vid.volume = t * target;
      if (t < 1) requestAnimationFrame(fade);
    };
    const onPlay = () => requestAnimationFrame(fade);
    vid.addEventListener('playing', onPlay, { once: true });
    return () => vid.removeEventListener('playing', onPlay);
  }, []);

  return (
    <motion.div
      exit={{ y: '-100%', opacity: 0, scale: 0.95, filter: 'blur(20px)' }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: '#000', zIndex: 9998 }}
    >
      <div className="relative w-full h-full" style={{ backgroundColor: '#000' }}>
        <video
          ref={videoRef}
          src="https://video.wixstatic.com/video/227dff_c261b2ce87fd489e9dc47a2e67dbe3f4/1080p/mp4/file.mp4#t=45"
          autoPlay playsInline loop
          onLoadedMetadata={(e) => { (e.target as HTMLVideoElement).currentTime = 45; }}
          className="absolute inset-0 w-full h-full object-cover opacity-50 pointer-events-none scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80" />

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 text-center w-full px-5 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1
              className="type-display mb-6 md:mb-8 tracking-[-0.08em]"
              style={{ color: '#fff', fontSize: 'clamp(1.8rem, 8vw, 7rem)', maxWidth: '100%', overflowWrap: 'break-word' }}
            >
              {formatText(lang === 'ar' ? 'Mobily Vyb' : 'Mobily Vyb')}
            </h1>
            <p
              className="type-subtitle italic max-w-2xl mx-auto text-[clamp(0.85rem,3.5vw,1.5rem)]"
              style={{ color: 'rgba(255,255,255,0.6)' }}
            >
              {formatText(lang === 'ar' ? 'صوت الطاقة الإقليمية.' : 'The Sound of Regional Energy.')}
            </p>
          </motion.div>
        </div>

        <div
          className="absolute bottom-16 md:bottom-20 left-1/2 -translate-x-1/2 z-20"
          style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
        >
          <motion.button
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8, ease: 'easeOut' }}
            whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(255,255,255,0.2)' }}
            whileTap={{ scale: 0.95 }}
            onClick={onStart}
            className="group relative overflow-hidden px-10 py-4 md:px-16 md:py-6 rounded-full text-xs md:text-sm uppercase tracking-[0.2em] md:tracking-[0.3em] font-black transition-all cursor-pointer"
            style={{ backgroundColor: '#fff', color: '#000', fontFamily: 'var(--font-mono)' }}
          >
            <span className="relative z-10">
              {lang === 'ar' ? 'ابدأ التجربة' : 'START EXPERIENCE'}
            </span>
            <div
              className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500"
              style={{ backgroundColor: 'var(--vyb-coral)' }}
            />
          </motion.button>
        </div>

        <div
          className="absolute bottom-4 md:bottom-8 left-4 md:left-12 z-10 flex gap-4 md:gap-8 items-center opacity-30"
          style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
        >
          <span className="vyb-ui-mono text-[7px] md:text-[9px]" style={{ color: '#fff' }}>
            RIYADH, KSA
          </span>
          <span className="vyb-ui-mono text-[7px] md:text-[9px]" style={{ color: '#fff' }}>
            MOBILY × NOJARA STUDIOS × ELEVATE
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default LoaderScreen;
