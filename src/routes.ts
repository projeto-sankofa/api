import { getAIResults } from "@/services/get-ai-results";
import { AIResultClassificationEnum, FastifyTypedInstance } from "@/types";
import z from "zod";

const aiResultSchema = z.object({
  id: z.string(),
  text: z.string(),
  classification: z.enum(AIResultClassificationEnum),
  confidence: z.number(),
  source: z.string(),
  collectedAt: z.date(),
});

export async function routes(app: FastifyTypedInstance) {
  app.get(
    "/ai-results",
    {
      schema: {
        tags: ["ai-results"],
        description: "Fetch all AI results",
        response: {
          200: z.array(aiResultSchema),
        },
      },
    },
    async () => {
      const aiResults = await getAIResults();

      return aiResults;
    }
  );
}
