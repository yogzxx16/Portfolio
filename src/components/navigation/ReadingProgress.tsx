import React, { useEffect, useState } from 'react';

export interface ReadingProgressProps {
  className?: string;
}

export const ReadingProgress: React.FC<ReadingProgressProps> = ({ className = '' }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (windowHeight === 0) return;
      const currentProgress = (totalScroll / windowHeight) * 100;
      setProgress(Math.min(100, Math.max(0, currentProgress)));
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
