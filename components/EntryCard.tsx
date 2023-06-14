import React from 'react';

export default function EntryCard({ entry }: { entry: any; }) {
  const date = new Date(entry.createdAt).toDateString();

  return (
    <div className='divide-y divide-gray-200 overflow-hidden bg-white shadow'>
      <div className='flex px-4 py-5 sm:px-6'>
        {date}
        <span className='ml-auto bg-slate-200 p-1 rounded-full'>{entry.analysis?.emoji}</span>
      </div>
      <div className='px-4 py-5 sm:px-6'>
        {entry.analysis?.summary}
      </div>
      <div className='px-4 py-5 sm:px-6'>
        {entry.analysis?.mood}
      </div>
    </div>
  );
}
