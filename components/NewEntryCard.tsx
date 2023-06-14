'use client';
import { createNewEntry } from '@/utils/api';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function NewEntryCard() {
  const router = useRouter();

  const handleOnClick = async () => {
    const data = await createNewEntry();
    router.push(`/journal/${data.id}`);
  };

  return (
    <button
      className='cursor-pointer overflow-hidden rounded-lg bg-red-500 text-white font-bold shadow'
      onClick={handleOnClick}
    >
      <div className='px-6 py-3'>
        <span className='text-xl'>New entry</span>
      </div>
    </button>
  );
}
