import HistoryChart from '@/components/HistoryChart';
import { getUserByClerkId } from '@/utils/auth';
import { prisma } from '@/utils/db';
import React from 'react';

const getData = async () => {
  const user = await getUserByClerkId();
  const analyses = await prisma.analysis.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: 'asc',
    }
  });

  const sum = analyses.reduce((acc, curr) => acc + curr.sentimentScore, 0);
  const avg = Math.ceil(sum / analyses.length);
  return { analyses, avg };
};

export default async function HistoryPage() {
  const { analyses, avg } = await getData();

  return (
    <div className='w-full h-full'>
      <div className="flex items-center justify-center w-full h-32">avg: {avg}</div>
      <HistoryChart data={analyses} />
    </div>
  );
}
