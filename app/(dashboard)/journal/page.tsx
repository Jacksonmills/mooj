import EntryCard from '@/components/EntryCard';
import NewEntryCard from '@/components/NewEntryCard';
import Question from '@/components/Question';
import { analyze } from '@/utils/ai';
import { getUserByClerkId } from '@/utils/auth';
import { prisma } from '@/utils/db';
import Link from 'next/link';
import React from 'react';

const getEntries = async () => {
  const user = await getUserByClerkId();
  const entries = await prisma.journalEntry.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      analysis: true,
    },
  });

  return entries;
};


export default async function Page() {
  const entries = await getEntries();

  return (
    <div className='p-10 bg-zinc-400/10 h-full flex flex-col gap-12 overflow-x-hidden'>
      <div className='flex items-center gap-12 flex-col justify-center lg:flex-row'>
        <div className='flex gap-6 items-center lg:mr-auto'>
          <h2 className='text-3xl'>Journal</h2>
          <NewEntryCard />
        </div>
        <Question />
      </div>
      <div className='grid grid-cols-1 gap-4 lg:grid-cols-3'>
        {entries.map((entry) => (
          <Link href={`/journal/${entry.id}`} key={entry.id}>
            <EntryCard entry={entry} />
          </Link>
        ))}
      </div>
    </div>
  );
}
