import React from 'react';
import { motion } from 'motion/react';

export interface InkButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'accent' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  target?: string;
  rel?: string;
  onClick?: (e?: React.MouseEvent) => void;
  disabled?: boolean;
  className?: string;
  icon?: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  'aria-label'?: string;
}

export const InkButton: React.FC<InkButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  href,
  target,
  rel,
  onClick,
  disabled = false,
  className = '',
  icon,
  type = 'button',
  'aria-label': ariaLabel,
}) => {
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-xs font-mono',
    md: 'px-5 py-2.5 text-xs sm:text-sm font-mono',
    lg: 'px-7 py-3 text-sm sm:text-base font-mono font-bold',
  };

  const variantStyles = {
    primary:
      'bg-[#D71936] text-white border-2 border-[#D71936] hover:bg-[#B3132B] shadow-noir',
    secondary:
      'bg-[#14151B] text-[#F4F2ED] border-2 border-[#23252C] hover:border-[#D71936] hover:text-white shadow-noir',
    accent:
      'bg-[#F4F2ED] text-[#090A0E] border-2 border-[#F4F2ED] hover:bg-white shadow-noir',
    ghost:
      'bg-transparent text-[#9DA6B8] border-2 border-[#23252C] hover:text-[#F4F2ED] hover:border-[#F4F2ED]',
  };

  const baseClasses = `inline-flex items-center justify-center gap-2 tracking-wider uppercase font-bold transition-all focus:outline-none focus:ring-2 focus:ring-[#D71936] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none active:translate-x-0.5 active:translate-y-0.5 ${sizeStyles[size]} ${variantStyles[variant]} ${className}`;

  if (href) {
    return (
      <motion.a
        href={href}
        target={target}
        rel={target === '_blank' ? (rel || 'noopener noreferrer') : rel}
        onClick={onClick}
        className={baseClasses}
        aria-label={ariaLabel}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
      >
        {icon && <span className="inline-flex shrink-0">{icon}</span>}
        <span>{children}</span>
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={baseClasses}
      aria-label={ariaLabel}
      whileHover={{ scale: disabled ? 1 : 1.01 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
    >
      {icon && <span className="inline-flex shrink-0">{icon}</span>}
      <span>{children}</span>
    </motion.button>
  );
};
