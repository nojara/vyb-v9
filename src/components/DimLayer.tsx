interface DimLayerProps {
  opacity?: number;
  gradient?: boolean;
}

const DimLayer = ({ opacity = 0.45, gradient = false }: DimLayerProps) => (
  <div
    className="absolute inset-0 pointer-events-none"
    style={{
      zIndex: 'var(--z-fx)' as any,
      background: gradient
        ? `linear-gradient(to bottom, rgba(0,0,0,${opacity * 0.6}), rgba(0,0,0,${opacity}))`
        : `rgba(0,0,0,${opacity})`,
    }}
    aria-hidden="true"
  />
);

export default DimLayer;
