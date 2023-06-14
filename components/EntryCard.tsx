import React from 'react';

export default function EntryCard({ entry }) {
  const date = new Date(entry.createdAt).toDateString();

  return (
    <div className='divide-y divide-gray-200 overflow-hidden bg-white shadow'>
      <div className='px-4 py-5 sm:px-6'>
        {date}
      </div>
      <div className='px-4 py-5 sm:px-6'>
        {'subject'}
      </div>
      <div className='px-4 py-5 sm:px-6'>
        {'mood'}
      </div>
    </div>
  );
}
