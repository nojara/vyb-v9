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
      className="fixed bottom-4 left-4 md:bottom-8 md:left-8 z-[150] flex items-end gap-3 md:gap-4 pointer-events-none pb-[env(safe-area-inset-bottom)]"
      role="status"
      aria-live="polite"
      aria-label={`Slide ${activeIndex} of ${SLIDES.length}`}
    >
      {/* Animated counter */}
      <AnimatePresence mode="wait">
        <motion.span
          key={activeId}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="vyb-metric text-[clamp(1.2rem,5vw,2rem)] md:text-[var(--fs-metric)]"
          style={{ color: palette.primary }}
          aria-hidden="true"
        >
          {String(activeIndex).padStart(2, '0')}
        </motion.span>
      </AnimatePresence>

      <div className="flex flex-col gap-1 mb-1 md:mb-2">
        {/* Progress bar */}
        <div
          className="w-10 md:w-16 h-[2px] overflow-hidden"
          style={{ backgroundColor: `${palette.text}33` }}
          role="progressbar"
          aria-valuenow={Math.round(progress * 100)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Presentation progress"
        >
          <motion.div
            className="h-full"
            style={{ backgroundColor: palette.primary }}
            animate={{ scaleX: progress }}
            transition={{ duration: 0.3 }}
            initial={{ scaleX: 0, transformOrigin: 'left' }}
          />
        </div>

        {/* Total */}
        <span className="vyb-ui-mono opacity-40 text-[8px] md:text-[var(--fs-mono-ui)]" style={{ color: palette.text }} aria-hidden="true">
          {SLIDES.length}
        </span>
      </div>
    </div>
  );
};

export default BottomPagination;
