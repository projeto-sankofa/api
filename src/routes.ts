import z from "zod";
import { FastifyTypedInstance } from "@/types";
import { aiResultSelectSchema } from "@/db/schema";
import { getAIResults } from "@/services/get-ai-results";

export async function routes(app: FastifyTypedInstance) {
  app.get(
    "/ai-results",
    {
      schema: {
        tags: ["ai-results"],
        description: "Fetch all AI results",
        response: {
          200: z.array(aiResultSelectSchema),
        },
      },
    },
    async () => {
      const aiResults = await getAIResults();

      return aiResults;
    }
  );
}
