import fp from "fastify-plugin";
import amqp, {
  Channel,
  Connection,
  ChannelModel,
  ConsumeMessage,
} from "amqplib";
import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { updateStatusFromQueue } from "../services/example.service";

const queueName = "execution_queue";

async function consumeRabbitMessage(
  msg: ConsumeMessage | null,
  fastify: FastifyInstance,
  channel: Channel
) {
  if (!msg) {
    return;
  }

  try {
    const data = JSON.parse(msg.content.toString());
    console.log("Mensagem consumida: ");
    console.log({ data });

    // do something else
    updateStatusFromQueue(data.id);

    channel.ack(msg);
  } catch (error) {
    fastify.log.error(error);
  }
}

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

    await channel.assertQueue(queueName, { durable: false }).then(() => {
      // listen to the queue
      return channel.consume(
        queueName,
        async (msg) => {
          await consumeRabbitMessage(msg, fastify, channel);
        },
        { noAck: false }
      );
    });

    fastify.addHook("onClose", async () => {
      await channel.close();
      await connection.close();
    });
  } catch (error) {
    console.error("RabbitMQ connection error:", error);
    throw error;
  }
}

export default fp(rabbitPlugin, { name: "rabbitPluginConsumer" });
