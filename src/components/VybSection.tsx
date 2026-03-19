import { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'motion/react';
import { ComputedSectionData, textVariants } from '@/data/sections';
import { formatText } from '@/utils/formatText';

const Icons = {
  Play: () => <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><path d="M5 3l14 9-14 9V3z"/></svg>,
  Chart: () => <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 20V10M12 20V4M6 20v-6"/></svg>,
  Close: () => <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>,
};

const FullscreenVideoModal = ({ src, startTime, onClose }: { src: string; startTime?: number; onClose: () => void }) => {
  const isYouTube = src.includes('youtube.com') || src.includes('youtu.be');
  const getYouTubeId = (url: string) => {
    const match = url.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/);
    return match?.[2]?.length === 11 ? match[2] : null;
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.1 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-6 md:p-12"
      style={{ backgroundColor: 'rgba(0,0,0,0.98)', backdropFilter: 'blur(100px)' }}
    >
      <motion.button 
        initial={{ opacity: 0, rotate: -90 }} animate={{ opacity: 1, rotate: 0 }}
        onClick={onClose}
        className="absolute top-10 right-10 z-20 cursor-pointer p-4 rounded-full border"
        style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.1)', backgroundColor: 'rgba(255,255,255,0.05)' }}
      >
        <Icons.Close />
      </motion.button>

      <div className="relative w-full max-w-7xl aspect-video rounded-[2.5rem] overflow-hidden border" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
        {isYouTube ? (
          <iframe
            src={`https://www.youtube.com/embed/${getYouTubeId(src)}?autoplay=1&start=${startTime || 0}&modestbranding=1&rel=0`}
            className="w-full h-full" allow="autoplay; encrypted-media" allowFullScreen
          />
        ) : (
          <video src={src} autoPlay controls playsInline className="w-full h-full object-cover"
            onLoadedMetadata={(e) => { if (startTime) e.currentTarget.currentTime = startTime; }} />
        )}
      </div>
    </motion.div>
  );
};

const MediaCard = ({ type, videoSrc, startTime }: { type: 'vertical' | 'square' | 'chart'; videoSrc?: string; startTime?: number }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const isVert = type === 'vertical';
  const isChart = type === 'chart';
  const isYouTube = videoSrc && (videoSrc.includes('youtube.com') || videoSrc.includes('youtu.be'));
  const getYouTubeId = (url: string) => {
    const match = url.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/);
    return match?.[2]?.length === 11 ? match[2] : null;
  };

  return (
    <>
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        onClick={() => videoSrc && setIsFullscreen(true)}
        className={`relative group overflow-hidden rounded-[2.5rem] glass-card transition-all duration-700 shadow-2xl hover:scale-[1.03] ${
          videoSrc ? 'cursor-pointer' : 'cursor-default'
        } ${isVert ? 'aspect-[9/16] w-full max-w-[380px]' : isChart ? 'aspect-[16/9] w-full' : 'aspect-square w-full max-w-[550px]'}`}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10" />
        
        {videoSrc ? (
          isYouTube ? (
            <div className="absolute inset-0 w-full h-full">
              <iframe
                src={`https://www.youtube.com/embed/${getYouTubeId(videoSrc)}?autoplay=1&mute=1&loop=1&playlist=${getYouTubeId(videoSrc)}&controls=0&showinfo=0&rel=0&modestbranding=1`}
                className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none scale-110 group-hover:scale-100"
                allow="autoplay; encrypted-media"
              />
            </div>
          ) : (
            <video 
              src={videoSrc} autoPlay loop muted playsInline
              className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-1000 scale-110 group-hover:scale-100"
              onLoadedMetadata={(e) => { if (startTime) e.currentTarget.currentTime = startTime; }}
            />
          )
        ) : (
          <div className="flex flex-col items-center justify-center w-full h-full">
            <div className="relative z-10 scale-150 opacity-40 group-hover:opacity-100 transition-all duration-700">
              {isChart ? <Icons.Chart /> : <Icons.Play />}
            </div>
            <span className="mt-8 text-[10px] uppercase tracking-[0.3em] font-bold opacity-40" style={{ fontFamily: 'var(--f-mono)' }}>
              {isChart ? 'Data Visualization' : `VYB ${type} Asset`}
            </span>
          </div>
        )}

        {/* Scanlines */}
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[length:100%_2px,3px_100%] z-20 opacity-10 group-hover:opacity-20 transition-opacity" />
      </motion.div>

      <AnimatePresence>
        {isFullscreen && videoSrc && (
          <FullscreenVideoModal src={videoSrc} startTime={startTime} onClose={() => setIsFullscreen(false)} />
        )}
      </AnimatePresence>
    </>
  );
};

interface VybSectionProps {
  data: ComputedSectionData;
  onActive: (id: string) => void;
}

const VybSection = ({ data, onActive }: VybSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const yText = useTransform(scrollYProgress, [0, 1], [data.parallaxStrength, -data.parallaxStrength]);
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);
  const springYText = useSpring(yText, { stiffness: 100, damping: 30 });

  const variant = textVariants[data.textVariant as keyof typeof textVariants] || textVariants.fadeUp;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) onActive(data.id); },
      { threshold: 0.6 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [data.id, onActive]);

  const mediaContent = data.media && data.media.length > 0 && (
    <div className="flex flex-col md:flex-row flex-wrap gap-6 items-center justify-center w-full">
      {data.media.map((m, idx) =>
        Array.from({ length: m.count }).map((_, cIdx) => (
          <MediaCard key={`${idx}-${cIdx}`} type={m.type} videoSrc={m.videoSrc} startTime={m.startTime} />
        ))
      )}
    </div>
  );

  return (
    <section
      ref={sectionRef}
      id={data.id}
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden"
      style={{ backgroundColor: data.bgColor, color: data.textColor }}
    >
      <div className="grid-bg" style={{ color: data.textColor }} />
      <div className="spine-line" style={{ color: data.textColor }} />

      <motion.div 
        style={{ y: springYText, opacity }}
        className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-32"
      >
        {/* Takeaway strip */}
        <motion.div
          initial={{ width: 0 }} whileInView={{ width: 'auto' }}
          viewport={{ once: true }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden mb-12"
        >
          <span className="type-mono text-[9px] tracking-[0.4em] opacity-50 border-b pb-2" style={{ borderColor: 'currentColor' }}>
            {data.takeaway}
          </span>
        </motion.div>

        <div className={`flex flex-col ${data.media && data.media.length > 0 ? 'lg:flex-row' : ''} gap-12 lg:gap-24 items-start`}>
          {/* Text content */}
          <div className={`flex-1 ${data.media && data.media.length > 0 ? 'lg:max-w-[55%]' : 'max-w-5xl'}`}>
            <div className="mb-10 overflow-hidden">
              <motion.h2 
                variants={variant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-10%" }}
                className="type-poster mb-6 cursor-default"
              >
                {formatText(data.title)}
              </motion.h2>
              <motion.p 
                variants={textVariants.fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="type-subtitle cursor-default italic"
              >
                {formatText(data.subtitle)}
              </motion.p>
            </div>

            <div className="space-y-6 md:space-y-8">
              {data.bullets.map((bullet, i) => (
                <motion.div 
                  key={i}
                  variants={textVariants.fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-6 type-body p-3 -ml-3 rounded-2xl transition-all cursor-default group"
                >
                  <div className="w-1.5 h-1.5 mt-3 rounded-full opacity-40 shrink-0 group-hover:opacity-100 group-hover:scale-150 transition-all" style={{ backgroundColor: 'currentColor' }} />
                  <p className="opacity-90 group-hover:opacity-100 leading-relaxed">{formatText(bullet)}</p>
                </motion.div>
              ))}
            </div>

            {data.table && (
              <div className="w-full mt-12 overflow-x-auto border rounded-[2.5rem] glass-card shadow-2xl px-4 md:px-10 py-6 md:py-10" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
                <table className="w-full text-sm md:text-base text-left table-auto min-w-[600px]">
                  <thead>
                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.2)' }}>
                      {data.table.headers.map((h, i) => (
                        <th key={i} className="px-6 py-6 font-black uppercase tracking-[0.2em] text-[0.7rem] opacity-60">
                          {formatText(h)}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {data.table.rows.map((row, rIdx) => (
                      <tr key={rIdx} className="transition-all duration-500 group" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                        {row.map((cell, cIdx) => (
                          <td key={cIdx} className={`px-6 py-8 align-top whitespace-normal break-words leading-relaxed ${cIdx > 0 ? 'num-tabular font-medium' : 'font-serif italic text-lg md:text-xl'}`}>
                            {formatText(cell)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Media content */}
          {mediaContent && (
            <div className="flex-1 w-full flex items-center justify-center">
              {mediaContent}
            </div>
          )}
        </div>
      </motion.div>
    </section>
  );
};

export default VybSection;
