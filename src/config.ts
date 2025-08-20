import 'dotenv/config';
import z from "zod";

const envSchema = z.object({
    PORT: z.coerce.number(),
    FIREBASE_PRIVATE_KEY: z.string(),
    FIREBASE_PROJECT_ID: z.string(),
    FIREBASE_CLIENT_EMAIL: z.string(),
    RABBITMQ_URI: z.string() 
})

export const env = envSchema.parse(process.env)