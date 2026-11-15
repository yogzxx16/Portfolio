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
      'bg-[#151515] text-[#F4F0E8] border-2 border-[#151515] hover:bg-[#E53935] hover:border-[#E53935] hover:text-white',
    secondary:
      'bg-[#FAF8F5] text-[#151515] border-2 border-[#151515] hover:bg-[#EAE5DC]',
    accent:
      'bg-[#E53935] text-white border-2 border-[#151515] hover:bg-[#C62828]',
    ghost:
      'bg-transparent text-[#151515] border-2 border-[#151515] hover:bg-[#151515] hover:text-[#F4F0E8]',
  };

  const baseClasses = `inline-flex items-center justify-center gap-2 tracking-wider uppercase font-bold transition-all focus:outline-none focus:ring-2 focus:ring-[#E53935] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none shadow-manga hover:shadow-manga-lg active:translate-x-0.5 active:translate-y-0.5 active:shadow-none ${sizeStyles[size]} ${variantStyles[variant]} ${className}`;

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
