'use client';
import { updatedEntry } from '@/utils/api';
import React from 'react';
import { useAutosave } from 'react-autosave';

export default function Editor({ entry }: { entry: any; }) {
  const [value, setValue] = React.useState(entry?.content || '');
  const [isLoading, setIsLoading] = React.useState(false);
  const [analysis, setAnalysis] = React.useState(entry.analysis);

  useAutosave({
    data: value,
    onSave: async (_value) => {
      setIsLoading(true);
      const updated = await updatedEntry(entry.id, _value);
      setAnalysis(updated.analysis);
      setIsLoading(false);
    }
  });

  const { mood, summary, color, subject, negative, emoji } = analysis;

  const analysisData = [
    { name: 'Mood', value: mood },
    { name: 'Summary', value: summary },
    { name: 'Color', value: color },
    { name: 'Subject', value: subject },
    { name: 'Negative', value: negative ? 'Yes' : 'No' },
    { name: 'Emoji', value: emoji }
  ];

  return (
    <div className='w-full h-full grid grid-cols-1 lg:grid-cols-3 overflow-hidden'>
      <div className='col-span-2'>
        <div className='w-full h-full bg-slate-200'>
          {isLoading && (<div>Saving...</div>)}
          <textarea
            className='w-full h-full outline-none resize-none p-2 bg-slate-200'
            value={value}
            onChange={
              (e) => {
                setValue(e.target.value);
              }
            }
          />
        </div>
      </div>

      <div className='border-l border-black/10'>
        <div className='px-6 py-10' style={{ backgroundColor: color }}>
          <h2 className='text-2xl'>Analysis</h2>
        </div>
        <div>
          <ul>
            {analysisData.map((data) => (
              <li key={data.name}>
                <div className='flex gap-6 px-6 py-4 border-b border-black/10'>
                  <div className='text-sm font-bold'>{data.name}</div>
                  <div className='text-sm ml-auto'>{data.value}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
