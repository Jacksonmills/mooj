import React from 'react';
import { MaxWidthWrapper } from './MaxWidthWrapper';

export default function Layout({ children }: { children: React.ReactNode; }) {
  return (
    <div className="w-screen h-screen bg-black flex flex-col justify-center items-center text-white">
      <MaxWidthWrapper className="flex flex-col gap-8">
        {children}
      </MaxWidthWrapper>
    </div>
  );
}
