import { db } from "@/lib/firebase";
import { AIResult, AIResultWithId } from "@/types";
import { Timestamp } from "firebase-admin/firestore";

export async function getAIResults(): Promise<AIResultWithId[]> {
  try {
    const snapshot = await db
      .collection("ai_results")
      .orderBy("collectedAt", "asc")
      .get();

    const aiResults = snapshot.docs.map((doc) => {
      const data = doc.data() as AIResult;
      const collectedAt =
        data.collectedAt instanceof Timestamp
          ? data.collectedAt.toDate()
          : new Date(data.collectedAt);

      return {
        id: doc.id,
        ...data,
        collectedAt,
      } as AIResultWithId;
    });

    return aiResults;
  } catch (error) {
    throw new Error();
  }
}
