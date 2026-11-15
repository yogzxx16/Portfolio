import React from 'react';

export interface TechBadgeProps {
  name: string;
  variant?: 'default' | 'accent' | 'muted' | 'outline' | 'noir';
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
    default: 'bg-[#F4F2ED] text-[#090A0E] border border-[#090A0E] font-medium',
    accent: 'bg-[#D71936]/10 text-[#D71936] border border-[#D71936] font-bold',
    muted: 'bg-[#E5E3DD] text-[#23252C] border border-[#A0A6B2]',
    outline: 'bg-transparent text-[#9DA6B8] border border-[#23252C]',
    noir: 'bg-[#14151B] text-[#F4F2ED] border border-[#23252C]',
  };

  return (
    <span
      className={`inline-flex items-center font-mono tracking-tight select-none ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
    >
      {name}
    </span>
  );
};
