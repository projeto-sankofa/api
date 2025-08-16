import { callAI } from "@/adapters/call-ai";
import { db } from "@/db";
import { aiResultsTable } from "@/db/schema";
import { Comment } from "@/types";

export async function processComments(comment: Comment): Promise<void> {
  try {
    const { classification, confidence } = await callAI(comment.content);

    await db.insert(aiResultsTable).values({
      text: comment.content,
      classification: classification,
      confidence: String(confidence),
      source: comment.source,
    });
  } catch (error) {
    throw new Error()
  }
}
