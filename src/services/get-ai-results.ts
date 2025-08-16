import { db } from "@/db";
import { AIResult, aiResultsTable } from "@/db/schema";

export async function getAIResults(): Promise<AIResult[]> {
  try {
    const aiResults = await db
      .select()
      .from(aiResultsTable)
      .orderBy(aiResultsTable.collectedAt);

    return aiResults;
  } catch (error) {
    throw new Error();
  }
}
