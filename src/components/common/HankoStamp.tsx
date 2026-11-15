import React from 'react';

export interface HankoStampProps {
  label: string;
  subtext?: string;
  shape?: 'square' | 'circle';
  color?: 'red' | 'ink';
  size?: 'sm' | 'md' | 'lg';
  angle?: number;
  className?: string;
}

export const HankoStamp: React.FC<HankoStampProps> = ({
  label,
  subtext,
  shape = 'square',
  color = 'red',
  size = 'md',
  angle = -6,
  className = '',
}) => {
  const sizeStyles = {
    sm: 'w-10 h-10 text-xs',
    md: 'w-14 h-14 text-base',
    lg: 'w-20 h-20 text-2xl',
  };

  const colorStyles = {
    red: 'border-[#E53935] text-[#E53935]',
    ink: 'border-[#151515] text-[#151515]',
  };

  const isSquare = shape === 'square';

  return (
    <div
      style={{ transform: `rotate(${angle}deg)` }}
      className={`inline-flex flex-col items-center justify-center shrink-0 border-2 font-bold font-mono select-none p-1 transition-transform ${sizeStyles[size]} ${colorStyles[color]} ${isSquare ? 'rounded-none' : 'rounded-full'} ${className}`}
      aria-label={`Manga seal: ${label} ${subtext || ''}`}
    >
      <div
        className={`w-full h-full border border-dashed flex flex-col items-center justify-center ${colorStyles[color]} ${isSquare ? 'rounded-none' : 'rounded-full'}`}
      >
        <span className="font-display font-black leading-none">{label}</span>
        {subtext && (
          <span className="text-[8px] font-mono tracking-tighter uppercase leading-tight mt-0.5">
            {subtext}
          </span>
        )}
      </div>
    </div>
  );
};
