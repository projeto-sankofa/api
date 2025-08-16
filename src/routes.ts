import { FastifyTypedInstance } from "@/types";

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
