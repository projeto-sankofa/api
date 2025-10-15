import { getAIResults } from "@/services/get-ai-results";
import { AIResultClassificationEnum, FastifyTypedInstance } from "@/types";
import z from "zod";
import { callAI } from "./adapters/call-ai";

const aiResultSchema = z.object({
  id: z.string(),
  text: z.string(),
  classification: z.enum(AIResultClassificationEnum),
  confidence: z.number(),
  source: z.string(),
  collectedAt: z.date(),
});

export async function routes(app: FastifyTypedInstance) {
  const textos = [
  "Olá, como você está hoje?",
  "Qual é a previsão do tempo para amanhã?",
  "Conte uma piada curta",
  "Explique rapidamente o que é IA",
  "Qual é a capital da França?",
  "Seu macaco ",
  "Ontem vi um macaco na floresta que bonitinho!",
  "Cabelo horrível de bombril esse dessa muie",
  "Droga é vida",
  "Só por ela ser uma mulher negra e empoderada ela pensa que pode fazer isso",
  "Aquela negra é bonita"
];
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
  app.get("/teste_ai", async (request, reply) => {
    try {
      for (let i = 0; i < textos.length; i++) {
      const texto = textos[i];
      const res = await callAI(texto);
      console.log(`Texto: "${texto}" -> Resposta:`, res);
      console.log("teste"+ res)
    }
    return "Testes concluídos!";
    } catch (err) {
      console.error(err);
      reply.status(500).send("Erro no AI");
    }
  });

}
