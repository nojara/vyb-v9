import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

export function GlassCard({
  children,
  className,
  accentColor,
}: {
  children: ReactNode;
  className?: string;
  accentColor?: string;
}) {
  return (
    <div
      className={cn(
        'rounded-[var(--vyb-radius-card)] border p-6 relative overflow-hidden',
        'bg-[var(--vyb-glass-dark)] border-[var(--vyb-border-light)]',
        'shadow-[0_8px_40px_-12px_rgba(0,0,0,0.4)]',
        'transition-all duration-500 ease-out',
        'hover:shadow-[0_24px_80px_-16px_rgba(0,0,0,0.55)]',
        'hover:border-[rgba(255,255,255,0.22)]',
        'group/card',
        /* Mobile: lighter blur for perf; desktop: full blur */
        'backdrop-blur-md md:backdrop-blur-xl',
        className
      )}
    >
      {/* Inner highlight — top edge glow */}
      <div
        className="absolute top-0 left-0 right-0 h-px opacity-40 pointer-events-none"
        style={{
          background: accentColor
            ? `linear-gradient(90deg, transparent 10%, ${accentColor}60, transparent 90%)`
            : 'linear-gradient(90deg, transparent 10%, rgba(255,255,255,0.25), transparent 90%)',
        }}
      />

      {/* Shimmer accent line on hover */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: accentColor
            ? `linear-gradient(90deg, transparent, ${accentColor}, transparent)`
            : 'linear-gradient(90deg, transparent, var(--vyb-cyan), transparent)',
        }}
      />

      {/* Subtle inner glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-700 pointer-events-none rounded-[var(--vyb-radius-card)]"
        style={{
          background: accentColor
            ? `radial-gradient(ellipse at 50% 0%, ${accentColor}08, transparent 70%)`
            : 'radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.04), transparent 70%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
