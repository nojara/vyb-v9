import { useRef, useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '@/context/LanguageContext';

interface IntroSequenceProps {
  onComplete: () => void;
}

const ease = [0.22, 1, 0.36, 1] as const;

const ScrollPulse = () => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 1.6, duration: 0.8, ease }}
    className="flex flex-col items-center gap-3"
    style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
  >
    <motion.div
      animate={{ scale: [1, 1.18, 1], opacity: [0.45, 0.85, 0.45] }}
      transition={{ repeat: Infinity, duration: 2.6, ease: 'easeInOut' }}
      className="relative w-11 h-11 md:w-14 md:h-14 flex items-center justify-center"
    >
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: `conic-gradient(from 180deg, var(--vyb-cyan), var(--vyb-teal), var(--vyb-lime), var(--vyb-yellow), var(--vyb-cyan))`,
          filter: 'blur(5px)',
          opacity: 0.7,
        }}
      />
      <div className="absolute inset-[2px] rounded-full bg-background" />
      <motion.svg
        animate={{ y: [0, 5, 0] }}
        transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
        width="16" height="16" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="1.5"
        className="relative z-10"
        style={{ color: 'var(--vyb-cyan)' }}
      >
        <path d="M12 5v14M5 12l7 7 7-7" />
      </motion.svg>
    </motion.div>
    <span className="vyb-ui-mono text-[8px] md:text-[9px] text-muted-foreground">
      SCROLL
    </span>
  </motion.div>
);

const IntroSequence = ({ onComplete }: IntroSequenceProps) => {
  const { lang } = useLanguage();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const sections = el.querySelectorAll<HTMLElement>('[data-intro-section]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const idx = Number((entry.target as HTMLElement).dataset.introSection);
            setActiveSection(idx);
          }
        });
      },
      { root: el, threshold: 0.6 }
    );
    sections.forEach(s => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (activeSection === 2) {
      const t = setTimeout(onComplete, 2400);
      return () => clearTimeout(t);
    }
  }, [activeSection, onComplete]);

  return (
    <motion.div
      exit={{ opacity: 0, scale: 0.97, filter: 'blur(14px)' }}
      transition={{ duration: 0.9, ease }}
      className="fixed inset-0 overflow-hidden bg-background"
      style={{ zIndex: 9999 }}
    >
      <div className="texture-overlay" aria-hidden="true" />
      <div className="cinematic-vignette" aria-hidden="true" />

      <div
        className="fixed inset-0 pointer-events-none z-0"
        aria-hidden="true"
        style={{
          background: `radial-gradient(ellipse 60% 50% at 50% 50%, rgba(41,200,232,0.06), transparent 70%)`,
        }}
      />

      <div
        ref={scrollRef}
        className="relative w-full h-full overflow-y-auto snap-y snap-mandatory"
        style={{ scrollbarWidth: 'none', zIndex: 1 }}
      >
        {/* ─── Section 0: Elevate Logo ─── */}
        <section
          data-intro-section="0"
          className="relative w-full flex flex-col items-center justify-center gap-10 md:gap-14 snap-start snap-always"
          style={{ height: '100svh' }}
        >
          <div className="flex items-center gap-10 md:gap-16">
            <motion.div
              initial={{ opacity: 0, x: -50, scale: 0.85 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 1.3, delay: 0.35, ease }}
              className="relative"
            >
              <img
                src="https://elevate-it.com/wp-content/uploads/2024/10/Elvete-logo-2-2048x333.png"
                alt="Elevate"
                className="w-[120px] md:w-[220px] h-auto object-contain"
                style={{ filter: 'brightness(0) invert(1)' }}
              />
              <div
                className="absolute -inset-4 -z-10 rounded-full opacity-20 blur-2xl"
                style={{ backgroundColor: 'var(--vyb-cyan)' }}
              />
            </motion.div>

            <motion.div
              initial={{ scaleY: 0, opacity: 0 }}
              animate={{ scaleY: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8, ease }}
              className="w-px h-10 md:h-14 origin-center"
              style={{
                background: `linear-gradient(to bottom, transparent, var(--vyb-teal), transparent)`,
                opacity: 0.35,
              }}
            />

            <motion.div
              initial={{ opacity: 0, x: 50, scale: 0.85 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 1.3, delay: 0.5, ease }}
              className="relative"
            >
              <img
                src="https://static.wixstatic.com/media/227dff_d4d02dbb309a4982990c4a17aadfe4b2~mv2.png"
                alt="Nojara"
                className="w-[120px] md:w-[220px] h-auto object-contain"
                style={{ filter: 'brightness(0) invert(1)' }}
              />
              <div
                className="absolute -inset-4 -z-10 rounded-full opacity-20 blur-2xl"
                style={{ backgroundColor: 'var(--vyb-teal)' }}
              />
            </motion.div>
          </div>
          </motion.div>

          <ScrollPulse />
        </section>

        {/* ─── Section 1: "Presents" ─── */}
        <section
          data-intro-section="1"
          className="relative w-full flex items-center justify-center snap-start snap-always"
          style={{ height: '100svh' }}
        >
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-20%' }}
            transition={{ duration: 1, ease }}
            className="text-center"
          >
            <h2
              className="font-display font-bold tracking-[0.2em] uppercase"
              style={{
                color: 'var(--vyb-cyan)',
                fontSize: 'clamp(2.5rem, 6vw, 5rem)',
                textShadow: '0 0 40px rgba(41,200,232,0.3)',
              }}
            >
              {lang === 'ar' ? 'تقدّم' : 'PRESENTS'}
            </h2>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3, ease }}
              className="mx-auto mt-5 h-px w-20 md:w-32 origin-center"
              style={{
                background: `linear-gradient(90deg, transparent, var(--vyb-cyan), transparent)`,
                opacity: 0.4,
              }}
            />
          </motion.div>
        </section>

        {/* ─── Section 2: Vyb Sessions + Brought to you by Mobily ─── */}
        <section
          data-intro-section="2"
          className="relative w-full flex flex-col items-center justify-center gap-8 md:gap-10 snap-start snap-always px-5"
          style={{ height: '100svh' }}
        >
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: '-15%' }}
            transition={{ duration: 1.3, ease }}
            className="text-center relative"
          >
            <div
              className="absolute inset-0 -z-10 blur-3xl opacity-15"
              style={{
                background: `radial-gradient(circle, var(--vyb-yellow), transparent 70%)`,
              }}
            />
            <h1
              className="vyb-hero-title"
              style={{ color: 'hsl(var(--foreground))' }}
            >
              <span className="uppercase">V</span>
              <span className="lowercase">yb</span>{' '}
              <span>Sessions</span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-20%' }}
            transition={{ duration: 0.9, delay: 0.3, ease }}
            className="flex flex-col items-center gap-5 md:gap-6"
          >
            <span
              className="vyb-label tracking-[0.2em]"
              style={{ color: 'hsl(var(--muted-foreground))' }}
            >
              {lang === 'ar' ? 'مقدّمة من' : 'BROUGHT TO YOU BY'}
            </span>

            <motion.div
              initial={{ opacity: 0, scale: 0.82 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.1, delay: 0.5, ease }}
              className="relative"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Mobily_Logo.svg/960px-Mobily_Logo.svg.png"
                alt="Mobily"
                className="h-12 md:h-18 lg:h-22 w-auto object-contain"
                style={{ filter: 'brightness(0) invert(1)' }}
              />
              <div
                className="absolute -inset-6 -z-10 rounded-full opacity-15 blur-3xl"
                style={{ backgroundColor: 'var(--vyb-yellow)' }}
              />
            </motion.div>
          </motion.div>
        </section>
      </div>
    </motion.div>
  );
};

export default IntroSequence;
