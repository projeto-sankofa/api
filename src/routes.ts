import { FastifyTypedInstance } from "@/types";
import z from "zod";

export async function routes(app: FastifyTypedInstance) {
  app.get(
    "/analises",
    {
      schema: {
        tags: ["analises"],
        description: 'Buscar todas as análises',
      },
    },
    async () => {
      return [];
    }
  );
}
