import React from 'react';
import { motion } from 'motion/react';

export interface MangaPanelProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'paper' | 'wash' | 'ink' | 'noir' | 'bordered-only' | 'ghost';
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
  // Pure Manga Noir variants:
  // - default / paper: Bleached manga paper (#F4F2ED) with jet black ink text (#090A0E) and hard 2px ink border
  // - wash: Slightly toned manga paper (#E8E5DD)
  // - ink / noir: Void obsidian (#14151B) with crisp white text (#F4F2ED) and graphite border (#23252C)
  // - bordered-only / ghost: Transparent with graphite border (#23252C) and white text (#F4F2ED)
  const variantStyles = {
    default: 'bg-[#F4F2ED] text-[#090A0E] border-2 border-[#090A0E] shadow-noir',
    paper: 'bg-[#F4F2ED] text-[#090A0E] border-2 border-[#090A0E] shadow-noir',
    wash: 'bg-[#E8E5DD] text-[#090A0E] border-2 border-[#090A0E] shadow-noir',
    ink: 'bg-[#14151B] text-[#F4F2ED] border-2 border-[#23252C] shadow-noir',
    noir: 'bg-[#14151B] text-[#F4F2ED] border-2 border-[#23252C] shadow-noir',
    'bordered-only': 'bg-transparent text-[#F4F2ED] border-2 border-[#23252C]',
    ghost: 'bg-transparent text-[#F4F2ED] border-2 border-[#23252C]',
  };

  const isDarkPanel = variant === 'ink' || variant === 'noir' || variant === 'bordered-only' || variant === 'ghost';

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
              boxShadow: isDarkPanel ? '6px 6px 0px 0px #D71936' : '6px 6px 0px 0px #090A0E',
              transition: { duration: 0.15 },
            }
          : undefined
      }
      className={`relative p-5 md:p-6 transition-colors ${variantStyles[variant]} ${notchStyles[notch]} ${className}`}
    >
      {/* Editorial Corner Tag / Numbering */}
      {tag && (
        <div
          className={`absolute top-0 right-0 -translate-y-1/2 translate-x-1 px-2.5 py-0.5 font-mono text-[10px] tracking-widest uppercase font-bold border ${
            isDarkPanel
              ? 'bg-[#D71936] text-white border-[#D71936]'
              : 'bg-[#090A0E] text-[#F4F2ED] border-[#090A0E]'
          }`}
        >
          {tag}
        </div>
      )}
      {children}
    </motion.div>
  );
};
