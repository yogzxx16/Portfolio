import React from 'react';
import { motion } from 'motion/react';

export interface MangaPanelProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'wash' | 'ink' | 'bordered-only';
  notch?: 'none' | 'top-right' | 'bottom-right';
  hoverEffect?: boolean;
  tag?: string;
  id?: string;
  onClick?: () => void;
}

export const MangaPanel: React.FC<MangaPanelProps> = ({
  children,
  className = '',
  variant = 'default',
  notch = 'none',
  hoverEffect = false,
  tag,
  id,
  onClick,
}) => {
  const variantStyles = {
    default: 'bg-[#FAF8F5] text-[#151515] border-2 border-[#151515]',
    wash: 'bg-[#EAE5DC] text-[#151515] border-2 border-[#151515]',
    ink: 'bg-[#151515] text-[#F4F0E8] border-2 border-[#151515]',
    'bordered-only': 'bg-transparent text-[#151515] border-2 border-[#151515]',
  };

  const notchStyles = {
    none: '',
    'top-right': 'notch-top-right',
    'bottom-right': 'notch-bottom-right',
  };

  return (
    <motion.div
      id={id}
      onClick={onClick}
      whileHover={
        hoverEffect
          ? {
              x: -2,
              y: -2,
              boxShadow: '6px 6px 0px 0px #151515',
              transition: { duration: 0.15 },
            }
          : undefined
      }
      className={`relative p-5 md:p-6 shadow-manga transition-colors ${variantStyles[variant]} ${notchStyles[notch]} ${className}`}
    >
      {/* Editorial Corner Tag / Numbering */}
      {tag && (
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1 px-2 py-0.5 bg-[#151515] text-[#F4F0E8] font-mono text-[10px] tracking-widest uppercase border border-[#151515]">
          {tag}
        </div>
      )}
      {children}
    </motion.div>
  );
};
