import { UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import React from 'react';

export default function DashboardLayout({ children }: { children: React.ReactNode; }) {
  return (
    <div className='h-screen w-screen relative'>
      <aside className='absolute w-[200px] top-0 left-0 h-full border-r border-black/10 flex flex-col gap-6 items-center pt-6'>
        <div className='text-xl font-bold'>MOOJ</div>
        <div className='flex flex-col items-center gap-6'>
          <Link href="/journal">
            Journal
          </Link>
        </div>
      </aside>
      <div className='ml-[200px] h-full'>
        <header className='h-[60px] border-b border-black/10'>
          <div className='h-full w-full px-6 flex items-center justify-end'>
            <UserButton />
          </div>
        </header>
        <div className='h-[calc(100vh-60px)]'>{children}</div>
      </div>
    </div>
  );
}
