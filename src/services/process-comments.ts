import { callAI } from "@/adapters/call-ai";
import { db } from "@/lib/firebase";
import { Comment } from "@/types";

export async function processComments(comment: Comment): Promise<void> {
  try {
    const { label, score } = await callAI(comment.content);

    await db.collection("ai_results").add({
      text: comment.content,
      classification: label,
      confidence: score,
      source: comment.source,
      collectedAt: new Date(),
    })
  } catch (error) {
    console.error("Error processing comment:", error);
  }
}
