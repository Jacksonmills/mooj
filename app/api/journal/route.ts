import { analyze } from "@/utils/ai";
import { getUserByClerkId } from "@/utils/auth";
import { prisma, AnalysisCreateInput } from "@/utils/db";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export const POST = async () => {
  const user = await getUserByClerkId();
  const entry = await prisma.journalEntry.create({
    data: {
      userId: user.id,
      content: "Skateboarded to the park. Had a good time. But then I fell and scraped my knee."
    }
  });

  const analysis = await analyze(entry.content);
  if (!analysis) {
    throw new Error("Analysis failed.");
  }

  const analysisEntry: AnalysisCreateInput = {
    userId: user.id,
    entryId: entry.id,
    ...analysis
  };

  await prisma.analysis.create({
    data: analysisEntry
  });

  revalidatePath("/journal");

  return NextResponse.json({ data: entry });
};