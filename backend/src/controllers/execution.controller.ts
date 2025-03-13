import { FastifyRequest, FastifyReply } from "fastify";

import { addExecution } from "../services/example.service";

export async function executeOracle(req: FastifyRequest, reply: FastifyReply) {
  const body = req.body as { resourceId: string; statement: string };

  const data = {
    flavor: "ORACLE",
    resourceId: body.resourceId,
  };

  const execution = await addExecution(data);

  req.publishMessage(data);

  return reply.send({ execution });
}
