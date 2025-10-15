import { db } from "@/lib/firebase";
import { AIResult, AIResultWithId } from "@/types";
import { Timestamp } from "firebase-admin/firestore";

interface GetAIResultsParams {
  page: number;
  limit: number;
}

export async function getAIResults({
  page,
  limit,
}: GetAIResultsParams): Promise<AIResultWithId[]> {
  try {
    const offset = (page - 1) * limit;
    const snapshot = await db
      .collection("ai_results")
      .orderBy("collectedAt", "asc")
      .limit(limit)
      .offset(offset)
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
