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
      className="fixed bottom-4 left-4 md:bottom-6 md:left-6 z-[150] flex items-end gap-2 md:gap-3 pointer-events-none pb-[env(safe-area-inset-bottom)]"
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
          className="font-mono text-[clamp(0.7rem,1.5vw,0.9rem)] tabular-nums"
          style={{ color: palette.text, letterSpacing: 'var(--ls-mono)' }}
          aria-hidden="true"
        >
          {String(activeIndex).padStart(2, '0')}
        </motion.span>
      </AnimatePresence>

      <div className="flex flex-col gap-1 mb-0.5">
        {/* Progress bar */}
        <div
          className="w-8 md:w-12 h-[1.5px] overflow-hidden rounded-full"
          style={{ backgroundColor: `${palette.text}22` }}
          role="progressbar"
          aria-valuenow={Math.round(progress * 100)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Presentation progress"
        >
          <motion.div
            className="h-full rounded-full"
            style={{ backgroundColor: palette.primary }}
            animate={{ scaleX: progress }}
            transition={{ duration: 0.3 }}
            initial={{ scaleX: 0, transformOrigin: 'left' }}
          />
        </div>

        {/* Total */}
        <span
          className="font-mono opacity-30 text-[7px] md:text-[8px] tracking-widest uppercase"
          style={{ color: palette.text }}
          aria-hidden="true"
        >
          {SLIDES.length}
        </span>
      </div>
    </div>
  );
};

export default BottomPagination;
