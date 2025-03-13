import { fastify } from "fastify";

declare module "fastify" {
  interface FastifyRequest {
    publishMessage(messageObject: any): void;
  }
}
