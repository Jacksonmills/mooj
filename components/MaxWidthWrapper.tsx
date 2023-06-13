import React from 'react';

interface MaxWidthWrapperProps {
  children: React.ReactNode;
  className?: string;
  maxWidth?: number;
}

export const MaxWidthWrapper = ({ children, className, maxWidth = 600 }: MaxWidthWrapperProps) => {
  return (
    <div className={`w-full max-w-[${maxWidth}px] mx-auto px-10 ${className}`}>
      {children}
    </div>
  );
};