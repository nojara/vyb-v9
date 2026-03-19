import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import MotionBlock from './MotionBlock';

interface VideoEmbedProps {
  videoSrc: string;
  type?: 'vertical' | 'square';
  startTime?: number;
  endTime?: number;
  delay?: number;
}

const getYouTubeId = (url: string) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};

const VideoEmbed = ({ videoSrc, type = 'vertical', startTime, endTime, delay = 0.5 }: VideoEmbedProps) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isYouTube = videoSrc.includes('youtube.com') || videoSrc.includes('youtu.be');
  const isVert = type === 'vertical';

  // Lazy-load YouTube iframes via IntersectionObserver
  useEffect(() => {
    if (!isYouTube) {
      setIsVisible(true);
      return;
    }
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [isYouTube]);

  return (
    <>
      <MotionBlock motionKey="cardRise" delay={delay}>
        <div
          ref={containerRef}
          onClick={() => setIsFullscreen(true)}
          className={`relative group overflow-hidden rounded-[var(--vyb-radius-card)] border border-white/10 bg-black/10 shadow-2xl cursor-pointer transition-transform duration-500 hover:scale-[1.02] ${
            isVert ? 'aspect-[9/16] w-full max-w-[320px]' : 'aspect-square w-full max-w-[480px]'
          }`}
          role="button"
          tabIndex={0}
          aria-label="Play video"
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setIsFullscreen(true); } }}
        >
          {isYouTube && isVisible ? (
            <iframe
              src={`https://www.youtube.com/embed/${getYouTubeId(videoSrc)}?autoplay=1&mute=1&loop=1&playlist=${getYouTubeId(videoSrc)}&controls=0&showinfo=0&rel=0&modestbranding=1&start=${startTime || 0}${endTime ? `&end=${endTime}` : ''}`}
              className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              allow="autoplay; encrypted-media"
              title="Embedded video"
              loading="lazy"
            />
          ) : isYouTube && !isVisible ? (
            <div className="absolute inset-0 w-full h-full bg-black/20 flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="white" aria-hidden="true">
                  <path d="M5 3l14 9-14 9V3z" />
                </svg>
              </div>
            </div>
          ) : (
            <video
              src={videoSrc}
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
              onLoadedMetadata={(e) => {
                if (startTime) e.currentTarget.currentTime = startTime;
              }}
            />
          )}

          {/* Play overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true">
            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                <path d="M5 3l14 9-14 9V3z" />
              </svg>
            </div>
          </div>
        </div>
      </MotionBlock>

      {/* Fullscreen modal */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 backdrop-blur-3xl flex items-center justify-center p-4"
            style={{ zIndex: 9999 }}
            onClick={() => setIsFullscreen(false)}
            role="dialog"
            aria-label="Video player"
          >
            <button
              onClick={() => setIsFullscreen(false)}
              aria-label="Close video"
              className="absolute top-8 right-8 text-white hover:text-white/50 transition-colors z-10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
            {isYouTube ? (
              <iframe
                src={`https://www.youtube.com/embed/${getYouTubeId(videoSrc)}?autoplay=1&start=${startTime || 0}`}
                className="w-full max-w-[90vw] aspect-video rounded-2xl shadow-2xl"
                allow="autoplay; encrypted-media"
                allowFullScreen
                title="Video player"
              />
            ) : (
              <video
                src={videoSrc}
                autoPlay
                controls
                playsInline
                className="w-full max-w-[90vw] max-h-[85vh] rounded-2xl shadow-2xl"
                onLoadedMetadata={(e) => {
                  if (startTime) e.currentTarget.currentTime = startTime;
                }}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default VideoEmbed;
