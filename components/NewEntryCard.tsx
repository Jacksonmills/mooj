import React from 'react';

export default function NewEntryCard() {
  return (
    <div className='cursor-pointer overflow-hidden rounded-lg bg-slate-500 shadow'>
      <div className='px-4 py-5 sm:p-6'>
        <span className='text-3xl'>New entry</span>
      </div>
    </div>
  );
}