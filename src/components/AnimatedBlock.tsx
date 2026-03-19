import { motion } from 'motion/react';
import { ReactNode } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface AnimatedBlockProps {
  slideIndex: number;
  children: ReactNode;
  delay?: number;
  className?: string;
}

/**
 * Smooth, cinematic animated block.
 * All variants use gentle translateY + opacity fade — no harsh rotateX, blur, or large offsets.
 */
const AnimatedBlock = ({ slideIndex, children, delay = 0, className = '' }: AnimatedBlockProps) => {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className={className}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8%' }}
      transition={{ duration: 0.85, ease, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedBlock;
