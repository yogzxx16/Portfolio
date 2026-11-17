import React, { useEffect, useState } from 'react';

export interface ReadingProgressProps {
  className?: string;
}

export const ReadingProgress: React.FC<ReadingProgressProps> = ({ className = '' }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let ticking = false;
    let lastProgress = -1;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const totalScroll = window.scrollY || document.documentElement.scrollTop;
          const windowHeight =
            document.documentElement.scrollHeight - document.documentElement.clientHeight;
          if (windowHeight > 0) {
            const currentProgress = Math.round((totalScroll / windowHeight) * 100);
            if (currentProgress !== lastProgress) {
              lastProgress = currentProgress;
              setProgress(Math.min(100, Math.max(0, currentProgress)));
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={`w-full h-1 bg-[#14151B] relative overflow-hidden ${className}`}
      role="progressbar"
      aria-label="Reading Progress"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className="h-full bg-[#D71936] transition-[width] duration-75 ease-out shadow-crimson"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};
