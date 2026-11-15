import React from 'react';

export interface HalftoneOverlayProps {
  density?: 'fine' | 'medium' | 'coarse';
  opacity?: 'very-subtle' | 'subtle' | 'medium';
  className?: string;
}

export const HalftoneOverlay: React.FC<HalftoneOverlayProps> = ({
  density = 'medium',
  opacity = 'subtle',
  className = '',
}) => {
  const densityStyles = {
    fine: 'bg-halftone-fine',
    medium: 'bg-halftone-muted',
    coarse: 'bg-halftone',
  };

  const opacityStyles = {
    'very-subtle': 'opacity-[0.03]',
    subtle: 'opacity-[0.06]',
    medium: 'opacity-[0.12]',
  };

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 ${densityStyles[density]} ${opacityStyles[opacity]} ${className}`}
    />
  );
};
