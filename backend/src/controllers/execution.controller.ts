import { FastifyRequest, FastifyReply } from "fastify";

import {
  addExecution,
  fetchExecutionById,
  fetchAllExecutions,
} from "../services/example.service";

export async function executeOracle(req: FastifyRequest, reply: FastifyReply) {
  const body = req.body as { resourceId: string; statement: string };

  const data = {
    flavor: "ORACLE",
    resourceId: body.resourceId,
  };

  const execution = await addExecution(data);

  req.publishMessage({
    id: execution._id.toString(),
    ...data,
  });

  return reply.send(execution);
}

export async function fetchExecution(req: FastifyRequest, reply: FastifyReply) {
  const { id } = req.params as { id: string };

  const execution = await fetchExecutionById(id);

  return reply.send(execution);
}

export async function fetchExecutions(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const execution = await fetchAllExecutions();
  return reply.send(execution);
}
