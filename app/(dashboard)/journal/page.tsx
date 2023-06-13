import EntryCard from '@/components/EntryCard';
import NewEntryCard from '@/components/NewEntryCard';
import { getUserByClerkId } from '@/utils/auth';
import { prisma } from '@/utils/db';
import React from 'react';

const getEntries = async () => {
  const user = await getUserByClerkId();
  const entries = await prisma.journalEntry.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: 'desc',
    }
  });

  return entries;
};

export default async function Page() {
  const entries = await getEntries();
  return (
    <div className='p-10 bg-zinc-400/10 h-full'>
      <h2 className='text-3xl mb-8'>Journal</h2>
      <div className='grid grid-col-3 gap-4'>
        <NewEntryCard />
        {entries.map((entry) => (
          <EntryCard key={entry.id} entry={entry} />
        ))}
        h</div>
    </div>
  );
}