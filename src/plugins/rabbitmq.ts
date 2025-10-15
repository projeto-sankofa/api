import fastifyPlugin from "fastify-plugin";
import amqp from "amqplib";
import { env } from "@/config";
import { processComments } from "@/services/process-comments";
import { Comment } from "@/types";

export const rabbitPlugin = fastifyPlugin(async (fastify, opts) => {
  const connection = await amqp.connect(env.RABBITMQ_URI);
  const channel = await connection.createChannel();
  console.log("✅ Conectado ao RabbitMQ");

  await channel.assertQueue(env.RABBITMQ_QUEUE, {
    durable: true,
  });

  channel.consume(
    env.RABBITMQ_QUEUE,
    async (msg) => {
      if (msg !== null) {
        const comment: Comment = JSON.parse(msg.content.toString());

        await processComments(comment);

        channel.ack(msg);
      }
    },
    {
      noAck: false,
    }
  );

  fastify.decorate("rabbitmq", { connection, channel });

  fastify.addHook("onClose", async () => {
    await channel.close();
    await connection.close();
    console.log("✅ Desconectado do RabbitMQ");
  });
});
