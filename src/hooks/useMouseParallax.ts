import { useEffect, useState, RefObject } from 'react';

interface ParallaxValues {
  x: number;
  y: number;
  rotateX: number;
  rotateY: number;
}

export function useMouseParallax(
  ref: RefObject<HTMLElement | null>,
  strength: number = 20
): ParallaxValues {
  const [values, setValues] = useState<ParallaxValues>({ x: 0, y: 0, rotateX: 0, rotateY: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handler = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const nx = (e.clientX - cx) / (rect.width / 2); // -1 to 1
      const ny = (e.clientY - cy) / (rect.height / 2);

      setValues({
        x: nx * strength,
        y: ny * strength,
        rotateX: -ny * (strength * 0.3),
        rotateY: nx * (strength * 0.3),
      });
    };

    const reset = () => setValues({ x: 0, y: 0, rotateX: 0, rotateY: 0 });

    el.addEventListener('mousemove', handler);
    el.addEventListener('mouseleave', reset);
    return () => {
      el.removeEventListener('mousemove', handler);
      el.removeEventListener('mouseleave', reset);
    };
  }, [ref, strength]);

  return values;
}
