import { callAI } from "@/adapters/call-ai";
import { db } from "@/lib/firebase";
import { Comment } from "@/types";

export async function processComments(comment: Comment): Promise<void> {
  try {
    const { classification, confidence } = await callAI(comment.content);

    await db.collection("ai_results").add({
      text: comment.content,
      classification: classification,
      confidence: confidence,
      source: comment.source,
    })
  } catch (error) {
    throw new Error()
  }
}
