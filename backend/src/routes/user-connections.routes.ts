import { FastifyInstance } from "fastify";
import {
  addConnection,
  fetchUserConnections
} from "../controllers/user-connections.controller";
import { addUserConnectionSchema } from "../schemas/add-user-connection-body";

export default async function executionRoutes(fastify: FastifyInstance) {
  fastify.get("/:user", fetchUserConnections);
  fastify.post(
    "/:user",
    { schema: { body: addUserConnectionSchema } },
    addConnection
  );
}
