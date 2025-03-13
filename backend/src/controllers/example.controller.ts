import { FastifyRequest, FastifyReply } from "fastify";

export async function ping(req: FastifyRequest, reply: FastifyReply) {
  return reply.send({ message: "pong" });
}
