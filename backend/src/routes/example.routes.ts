import { FastifyInstance } from "fastify";
import { ping } from "../controllers/example.controller";

export default async function exampleRoutes(fastify: FastifyInstance) {
  fastify.get("/ping", ping);
}
