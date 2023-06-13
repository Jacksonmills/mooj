import React from 'react';
import { prisma } from '@/utils/db';
import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

const createNewUser = async () => {
  const user = await currentUser();
  if (!user) return null;

  const match = await prisma.user.findUnique({
    where: {
      clerkId: user.id,
    }
  });

  if (!match) {
    await prisma.user.create({
      data: {
        clerkId: user.id,
        email: user.emailAddresses[0].emailAddress,
      }
    });
  }

  redirect('/journal');
};

export default async function Page() {
  await createNewUser();
  return <div>...loading</div>;
}