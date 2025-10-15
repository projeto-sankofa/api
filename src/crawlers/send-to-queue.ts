import { env } from "@/config";
import amqp from "amqplib";

export async function sendToQueue(comments: string[], sourceName: string) {
  const connection = await amqp.connect(env.RABBITMQ_URI);
  const channel = await connection.createChannel()

  await channel.assertQueue(env.RABBITMQ_QUEUE, { durable: true });

  for (const comment of comments) {
    const payload = {
      content: comment,
      source: sourceName,
    }

    channel.sendToQueue(
      env.RABBITMQ_QUEUE,
      Buffer.from(JSON.stringify(payload)),
      { persistent: true }
    );
  }
}
