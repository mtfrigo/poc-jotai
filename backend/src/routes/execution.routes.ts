import { FastifyInstance } from "fastify";
import { executeOracle } from "../controllers/execution.controller";
import { executeOracleBodySchema } from "../schemas/oracle-execute-body";

export default async function executionRoutes(fastify: FastifyInstance) {
  fastify.post(
    "/oracle",
    { schema: { body: executeOracleBodySchema } },
    executeOracle
  );
}
