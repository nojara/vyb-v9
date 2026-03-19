import type { Variants } from 'motion/react';

export type MotionKey =
  | 'heroLift'
  | 'maskReveal'
  | 'blurResolve'
  | 'cascadeUp'
  | 'diagIn'
  | 'spotlightFade'
  | 'cardRise'
  | 'cardSlide'
  | 'cardZoom'
  | 'timelineDraw'
  | 'metricCountIn'
  | 'statementDrop'
  | 'paragraphUnfold'
  | 'editorialSweep'
  | 'orbitIn'
  | 'portraitFade'
  | 'sealReveal'
  | 'dualColumnIn'
  | 'ctaBreathe'
  | 'maskDiagonalWipe'
  | 'parallaxStack'
  | 'depthZoom'
  | 'cardMorphIn'
  | 'spotlightReveal';

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

/**
 * All variants use GPU-friendly properties (transform + opacity) as primary animation.
 * Filter-based effects (blur, brightness) are used sparingly and only as one-shot reveals,
 * never continuously scrubbed.
 */
export const blockVariants: Record<MotionKey, Variants> = {
  heroLift: {
    hidden: { opacity: 0, y: 28, scale: 0.98 },
    show: {
      opacity: 1, y: 0, scale: 1,
      transition: { duration: 1.0, ease },
    },
  },
  maskReveal: {
    hidden: { opacity: 0, clipPath: 'inset(0 100% 0 0)' },
    show: {
      opacity: 1, clipPath: 'inset(0 0% 0 0)',
      transition: { duration: 0.9, ease },
    },
  },
  blurResolve: {
    hidden: { opacity: 0, y: 12 },
    show: {
      opacity: 1, y: 0,
      transition: { duration: 0.85, ease },
    },
  },
  cascadeUp: {
    hidden: { opacity: 0, y: 22 },
    show: (i = 0) => ({
      opacity: 1, y: 0,
      transition: { duration: 0.75, delay: i * 0.08, ease },
    }),
  },
  diagIn: {
    hidden: { opacity: 0, x: -16, y: 12 },
    show: {
      opacity: 1, x: 0, y: 0,
      transition: { duration: 0.8, ease },
    },
  },
  spotlightFade: {
    hidden: { opacity: 0, scale: 0.98 },
    show: {
      opacity: 1, scale: 1,
      transition: { duration: 0.9, ease },
    },
  },
  cardRise: {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1, y: 0,
      transition: { duration: 0.7, ease },
    },
  },
  cardSlide: {
    hidden: { opacity: 0, x: 20 },
    show: {
      opacity: 1, x: 0,
      transition: { duration: 0.75, ease },
    },
  },
  cardZoom: {
    hidden: { opacity: 0, scale: 0.95 },
    show: {
      opacity: 1, scale: 1,
      transition: { duration: 0.7, ease },
    },
  },
  timelineDraw: {
    hidden: { opacity: 0, scaleY: 0, transformOrigin: 'top' },
    show: {
      opacity: 1, scaleY: 1,
      transition: { duration: 0.9, ease },
    },
  },
  metricCountIn: {
    hidden: { opacity: 0, y: 16, scale: 0.96 },
    show: {
      opacity: 1, y: 0, scale: 1,
      transition: { duration: 0.65, ease },
    },
  },
  statementDrop: {
    hidden: { opacity: 0, y: -14 },
    show: {
      opacity: 1, y: 0,
      transition: { duration: 0.7, ease },
    },
  },
  paragraphUnfold: {
    hidden: { opacity: 0, y: 16 },
    show: {
      opacity: 1, y: 0,
      transition: { duration: 0.8, ease },
    },
  },
  editorialSweep: {
    hidden: { opacity: 0, x: -20 },
    show: {
      opacity: 1, x: 0,
      transition: { duration: 0.8, ease },
    },
  },
  orbitIn: {
    hidden: { opacity: 0, scale: 0.92, rotate: -4 },
    show: {
      opacity: 1, scale: 1, rotate: 0,
      transition: { duration: 0.85, ease },
    },
  },
  portraitFade: {
    hidden: { opacity: 0, x: 14, scale: 0.985 },
    show: {
      opacity: 1, x: 0, scale: 1,
      transition: { duration: 0.9, ease },
    },
  },
  sealReveal: {
    hidden: { opacity: 0, scale: 0.9, rotate: -3 },
    show: {
      opacity: 1, scale: 1, rotate: 0,
      transition: { duration: 0.78, ease },
    },
  },
  dualColumnIn: {
    hidden: { opacity: 0, y: 16 },
    show: {
      opacity: 1, y: 0,
      transition: { staggerChildren: 0.12, duration: 0.75, ease },
    },
  },
  ctaBreathe: {
    hidden: { opacity: 0, scale: 0.96 },
    show: {
      opacity: 1, scale: 1,
      transition: { duration: 0.7, ease },
    },
  },

  // ─── Cinematic variants ───

  maskDiagonalWipe: {
    hidden: { opacity: 0, clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)' },
    show: {
      opacity: 1, clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
      transition: { duration: 1.1, ease },
    },
  },
  parallaxStack: {
    hidden: { opacity: 0, y: 40, scale: 0.94 },
    show: {
      opacity: 1, y: 0, scale: 1,
      transition: { duration: 1.1, ease },
    },
  },
  depthZoom: {
    hidden: { opacity: 0, scale: 1.08 },
    show: {
      opacity: 1, scale: 1,
      transition: { duration: 1.2, ease },
    },
  },
  cardMorphIn: {
    hidden: { opacity: 0, scale: 0.88, rotateY: -6 },
    show: {
      opacity: 1, scale: 1, rotateY: 0,
      transition: { duration: 0.9, ease },
    },
  },
  spotlightReveal: {
    hidden: { opacity: 0, scale: 0.97 },
    show: {
      opacity: 1, scale: 1,
      transition: { duration: 1.2, ease },
    },
  },
};

/** Simple fade-only variant for reduced motion users */
export const reducedMotionVariant: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.3, ease: 'easeOut' },
  },
};

export const viewportOnce = { once: true, amount: 0.18 };
