import Editor from '@/components/Editor';
import { getUserByClerkId } from '@/utils/auth';
import { prisma } from '@/utils/db';
import { get } from 'http';
import React from 'react';

const getEntry = async (id: string) => {
  const user = await getUserByClerkId();
  const entry = await prisma.journalEntry.findUnique({
    where: {
      userId_id: {
        userId: user.id,
        id
      }
    },
  });

  return entry;
};

export default async function Page({ params }: { params: { id: string; }; }) {
  const entry = await getEntry(params.id);

  return (
    <div className='w-full h-full'>
      <Editor entry={entry} />
    </div>
  );
}
