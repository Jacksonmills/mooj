import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export type AnalysisCreateInput = {
  mood: string;
  summary: string;
  subject: string;
  negative: boolean;
  color: string;
  emoji: string;
  entryId: string;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  log: ['query',],
});

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}