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
        querystring: z.object({
          page: z.coerce.number().default(1),
          limit: z.coerce.number().default(10),
        }),
        response: {
          200: z.array(aiResultSchema),
        },
      },
    },
    async (req) => {
      const { page, limit } = req.query;
      const aiResults = await getAIResults({ page, limit });

      return aiResults;
    }
  );
}
