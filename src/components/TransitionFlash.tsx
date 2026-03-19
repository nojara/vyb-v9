import { motion, AnimatePresence } from 'motion/react';

interface TransitionFlashProps {
  activeId: string;
}

/**
 * Subtle cross-fade flash between slides — toned down from harsh white flash
 * to a gentle luminance pulse.
 */
const TransitionFlash = ({ activeId }: TransitionFlashProps) => (
  <AnimatePresence mode="wait">
    <motion.div
      key={activeId}
      className="fixed inset-0 bg-white/30 z-[9999] pointer-events-none"
      initial={{ opacity: 0.25 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      aria-hidden="true"
    />
  </AnimatePresence>
);

export default TransitionFlash;
