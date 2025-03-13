import fp from "fastify-plugin";
import amqp, { Channel, Connection, ChannelModel } from "amqplib";
import { FastifyInstance, FastifyPluginOptions } from "fastify";

const queueName = "execution_queue";

async function rabbitPlugin(
  fastify: FastifyInstance,
  opts: FastifyPluginOptions
  // done: any
) {
  let connection: ChannelModel;
  let channel: Channel;

  try {
    connection = await amqp.connect(process.env.RABBITMQ_URI!);
    channel = await connection.createChannel();

    await channel.assertQueue(queueName, { durable: false });

    function publishMessage(messageObject: any) {
      const msg = JSON.stringify(messageObject);
      channel.publish("", queueName, Buffer.from(msg));
    }

    fastify.decorate("publishMessage", publishMessage);

    fastify.addHook("preHandler", (request, _reply, done) => {
      request.publishMessage = publishMessage;
      done();
    });

    fastify.addHook("onClose", async () => {
      await channel.close();
      await connection.close();
    });
  } catch (error) {
    console.error("RabbitMQ connection error:", error);
    throw error; // Ensures Fastify fails to start if RabbitMQ is unavailable
  }
}

export default fp(rabbitPlugin, { name: "rabbitPlugin " });
