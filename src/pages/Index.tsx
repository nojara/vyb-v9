import { useState, useRef, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { LanguageProvider } from '@/context/LanguageContext';
import IntroSequence from '@/components/IntroSequence';
import LoaderScreen from '@/components/LoaderScreen';
import TopNav from '@/components/TopNav';
import BottomPagination from '@/components/BottomPagination';
import CerebroWidget from '@/components/CerebroWidget';
import TransitionFlash from '@/components/TransitionFlash';
import SlideRenderer from '@/components/SlideRenderer';
import { SLIDES, ComputedSlide } from '@/data/slides';
import { useReducedMotion } from '@/hooks/useReducedMotion';


// Bridge type for CerebroWidget compatibility
const toCerebroContext = (slide: ComputedSlide) => ({
  id: slide.id,
  chapter: slide.section,
  text: slide.headline || slide.subheadline || '',
  type: 'headline' as const,
  motion: '',
  transition: '',
  interaction: '',
  bgColor: slide.palette.bg,
  textColor: slide.palette.text,
  parallaxStrength: 0,
});

const MainExperience = () => {
  const [activeId, setActiveId] = useState(SLIDES[0].id);
  const scrollRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();
  const navJumpRef = useRef<string | null>(null);
  const navJumpTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const activeSlide = SLIDES.find(s => s.id === activeId) || SLIDES[0];
  const activeIndex = SLIDES.findIndex(s => s.id === activeId);
  const progress = SLIDES.length > 1 ? activeIndex / (SLIDES.length - 1) : 0;

  const handleNavigate = useCallback((slideId: string) => {
    setActiveId(slideId);
    navJumpRef.current = slideId;
    if (navJumpTimerRef.current) clearTimeout(navJumpTimerRef.current);
    navJumpTimerRef.current = setTimeout(() => { navJumpRef.current = null; }, 2000);
  }, []);

  const scrollToSlide = useCallback((direction: 'next' | 'prev') => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ top: direction === 'next' ? el.clientHeight : -el.clientHeight, behavior: prefersReduced ? 'auto' : 'smooth' });
  }, [prefersReduced]);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        scrollToSlide('next');
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        scrollToSlide('prev');
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [scrollToSlide]);

  // IntersectionObserver for activeId
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const sections = el.querySelectorAll<HTMLElement>('[data-slide-id]');
    const observer = new IntersectionObserver(
      (entries) => {
        // Skip observer updates during programmatic navigation
        if (navJumpRef.current) return;
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = (entry.target as HTMLElement).dataset.slideId;
            if (id) setActiveId(id);
          }
        });
      },
      { root: el, threshold: 0.6 }
    );
    sections.forEach(s => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: prefersReduced ? 0 : 0.6 }}
      role="main"
    >
      <TopNav activeId={activeId} palette={activeSlide.palette} onNavigate={handleNavigate} />
      {!prefersReduced && <TransitionFlash activeId={activeId} />}

      {/* Smooth cross-fade background */}
      <div
        className="fixed inset-0 z-0 transition-colors duration-700 ease-in-out"
        style={{ backgroundColor: activeSlide.palette.bg }}
        aria-hidden="true"
      />

      {/* Vertical snap-scroll container */}
      <div
        ref={scrollRef}
        className="fixed inset-0 flex flex-col overflow-y-auto overflow-x-hidden snap-y snap-mandatory"
        style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch', zIndex: 1 }}
        role="region"
        aria-label="Presentation slides"
      >
        {SLIDES.map((slide, i) => (
          <section
            key={slide.id}
            data-slide-id={slide.id}
            className="flex-shrink-0 w-full snap-start snap-always relative overflow-hidden"
            style={{ height: '100svh' }}
            role="region"
            aria-roledescription="slide"
            aria-label={slide.headline || slide.section || `Slide ${i + 1}`}
          >
            <SlideRenderer slide={slide} index={i} isActive={slide.id === activeId} />
          </section>
        ))}
      </div>

      <CerebroWidget activeContext={toCerebroContext(activeSlide)} textColor={activeSlide.palette.text} />
      <BottomPagination activeId={activeId} palette={activeSlide.palette} progress={progress} />
    </motion.div>
  );
};

const Index = () => {
  const [introComplete, setIntroComplete] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  return (
    <LanguageProvider>
      <div className="relative w-full overflow-hidden" style={{ backgroundColor: '#000', color: '#fff', height: '100svh' }}>
        <div className="texture-overlay" aria-hidden="true" />

        <AnimatePresence mode="wait">
          {!introComplete && (
            <IntroSequence key="intro" onComplete={() => setIntroComplete(true)} />
          )}
          {introComplete && !hasStarted && (
            <LoaderScreen key="loader" onStart={() => setHasStarted(true)} />
          )}
        </AnimatePresence>

        {hasStarted && <MainExperience />}
      </div>
    </LanguageProvider>
  );
};

export default Index;
