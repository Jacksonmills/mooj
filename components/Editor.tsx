'use client';
import { updatedEntry } from '@/utils/api';
import React from 'react';
import { useAutosave } from 'react-autosave';

export default function Editor({ entry }: { entry: any; }) {
  const [value, setValue] = React.useState(entry?.content || '');
  const [isLoading, setIsLoading] = React.useState(false);

  useAutosave({
    data: value,
    onSave: async (_value) => {
      setIsLoading(true);
      const updated = await updatedEntry(entry.id, _value);
      setIsLoading(false);
    }
  });

  return (
    <div className='w-full h-full'>
      {isLoading && (<div>Saving...</div>)}
      <textarea
        className='w-full h-full outline-none resize-none'
        value={value}
        onChange={
          (e) => {
            setValue(e.target.value);
          }
        }
      />
    </div>
  );
}
