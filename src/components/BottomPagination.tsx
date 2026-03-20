import { motion, AnimatePresence } from 'motion/react';
import { SLIDES } from '@/data/slides';

interface BottomPaginationProps {
  activeId: string;
  palette: { bg: string; primary: string; text: string; accent: string };
  progress: number;
}

const BottomPagination = ({ activeId, palette, progress }: BottomPaginationProps) => {
  const activeIndex = SLIDES.findIndex(s => s.id === activeId) + 1;

  return (
    <div
      className="fixed bottom-7 left-8 md:bottom-7 md:left-8 flex items-center gap-2.5 pointer-events-none pb-[env(safe-area-inset-bottom)]"
      style={{ zIndex: 'var(--z-chrome)' }}
      role="status"
      aria-live="polite"
      aria-label={`Slide ${activeIndex} of ${SLIDES.length}`}
    >
      {/* Compact animated counter */}
      <AnimatePresence mode="wait">
        <motion.span
          key={activeId}
          initial={{ y: 12, opacity: 0 }}
          animate={{ y: 0, opacity: 0.6 }}
          exit={{ y: -12, opacity: 0 }}
          transition={{ duration: 0.25 }}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--t-xs, 11px)',
            fontWeight: 400,
            color: 'rgba(255,255,255,0.3)',
            letterSpacing: '0.1em',
          }}
          className="tabular-nums"
          aria-hidden="true"
        >
          {String(activeIndex).padStart(2, '0')}
        </motion.span>
      </AnimatePresence>

      {/* Separator */}
      <div className="w-9 h-px" style={{ backgroundColor: 'rgba(255,255,255,0.12)' }} aria-hidden="true" />

      {/* Total */}
      <span
        className="font-mono text-[11px] tabular-nums"
        style={{ color: 'rgba(255,255,255,0.18)', letterSpacing: '0.14em' }}
        aria-hidden="true"
      >
        {String(SLIDES.length).padStart(2, '0')}
      </span>
    </div>
  );
};

export default BottomPagination;
