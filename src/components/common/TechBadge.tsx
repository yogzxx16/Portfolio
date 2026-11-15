import React from 'react';

export interface TechBadgeProps {
  name: string;
  variant?: 'default' | 'accent' | 'muted' | 'outline';
  size?: 'sm' | 'md';
  className?: string;
}

export const TechBadge: React.FC<TechBadgeProps> = ({
  name,
  variant = 'default',
  size = 'sm',
  className = '',
}) => {
  const sizeStyles = {
    sm: 'px-2 py-0.5 text-[11px]',
    md: 'px-2.5 py-1 text-xs',
  };

  const variantStyles = {
    default: 'bg-[#FAF8F5] text-[#151515] border border-[#151515]',
    accent: 'bg-[#E53935]/10 text-[#E53935] border border-[#E53935] font-bold',
    muted: 'bg-[#EAE5DC] text-[#55524E] border border-[#A5A19B]',
    outline: 'bg-transparent text-[#151515] border border-dashed border-[#151515]',
  };

  return (
    <span
      className={`inline-flex items-center font-mono tracking-tight select-none ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
    >
      {name}
    </span>
  );
};
