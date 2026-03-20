import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import MotionBlock from '@/components/MotionBlock';

interface ScrollArrowProps {
  color: string;
  delay?: number;
}

/** #8: Subtle scroll-down CTA for text-heavy sections */
const ScrollArrow = ({ color, delay = 0.8 }: ScrollArrowProps) => (
  <MotionBlock motionKey="ctaBreathe" delay={delay} className="mt-8">
    <motion.div
      animate={{ y: [0, 8, 0] }}
      transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
      className="flex flex-col items-center gap-1 opacity-30"
    >
      <span
        className="vyb-ui-mono"
        style={{ color, fontSize: 'var(--t-xs)' }}
      >
        CONTINUE
      </span>
      <ChevronDown size={16} style={{ color }} />
    </motion.div>
  </MotionBlock>
);

export default ScrollArrow;
