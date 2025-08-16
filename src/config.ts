import 'dotenv/config';
import z from "zod";

const envSchema = z.object({
    PORT: z.coerce.number(),
    DATABASE_URL: z.string(),
    RABBITMQ_URI: z.string() 
})

export const env = envSchema.parse(process.env)