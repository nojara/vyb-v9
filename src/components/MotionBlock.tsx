import { motion } from 'motion/react';
import { ReactNode } from 'react';
import { blockVariants, reducedMotionVariant, type MotionKey } from '@/motion/vybMotion';
import { useSlideActive } from '@/context/SlideActiveContext';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface MotionBlockProps {
  motionKey: MotionKey;
  children: ReactNode;
  delay?: number;
  custom?: number;
  className?: string;
}

const MotionBlock = ({ motionKey, children, delay = 0, custom, className = '' }: MotionBlockProps) => {
  const isActive = useSlideActive();
  const prefersReduced = useReducedMotion();

  // Use simple fade for reduced motion
  if (prefersReduced) {
    return (
      <motion.div
        variants={reducedMotionVariant}
        initial="hidden"
        animate={isActive ? 'show' : 'hidden'}
        className={className}
      >
        {children}
      </motion.div>
    );
  }

  const variant = blockVariants[motionKey];
  const showVariant = typeof variant.show === 'function'
    ? variant.show
    : {
        ...(variant.show as Record<string, unknown>),
        transition: {
          ...((variant.show as Record<string, unknown>).transition as Record<string, unknown>),
          delay: delay + (((variant.show as Record<string, unknown>).transition as Record<string, unknown>)?.delay as number || 0),
        },
      };

  return (
    <motion.div
      variants={{ hidden: variant.hidden, show: showVariant }}
      initial="hidden"
      animate={isActive ? 'show' : 'hidden'}
      custom={custom}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default MotionBlock;
