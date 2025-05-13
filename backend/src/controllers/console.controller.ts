

import { FastifyRequest, FastifyReply } from "fastify";

import {
  fetchUserConnections as fetchUserConnectionsService,
} from "../services/user-connections.service";

import {
  fetchPanels as fetchPanelsService,
  fetchOraclePanel as fetchOraclePanelService,
  addPanel as addPanelService,
  updateOraclePanel as updateOraclePanelService
} from "../services/console.service";


import {
  addPanel as addOraclePanelService
} from "../services/oracle.service";

export async function fetchConnectionPanels(req: FastifyRequest, reply: FastifyReply) {
  const { user } = req.params as { user: string , id: string };

  const connections = await fetchUserConnectionsService(user);

  return reply.send(connections);
}

export async function addConnectionPanel(req: FastifyRequest, reply: FastifyReply) {
  const { user, id } = req.params as { user: string , id: string };
  const { name } = req.body as { name: string };

  const panels = await addPanelService({
    data: { name },
    id,
    user,
  });

  return reply.send(panels);
}


export async function fetchPanels(req: FastifyRequest, reply: FastifyReply) {
  const { id, user } = req.params as {  id: string, user: string  };

  const panels = await fetchPanelsService(user, id);

  return reply.send(panels);
}

export async function fetchOraclePanel(req: FastifyRequest, reply: FastifyReply) {
  const { id } = req.params as {  id: string };

  const oraclePanel = await fetchOraclePanelService(id);

  return reply.send(oraclePanel);
}


export async function updateOraclePanel(req: FastifyRequest, reply: FastifyReply) {
  const { id } = req.params as {  id: string };
  const { statement, schema, executionId  } = req.body as { statement: string, executionId: string, schema: string };

  const oraclePanel = await updateOraclePanelService({
    id,
    schema,
    executionId,
    statement
  });

  return reply.send(oraclePanel);
}

export async function addOraclePanel(req: FastifyRequest, reply: FastifyReply) {
  const { user, id } = req.params as { user: string , id: string };
  const { name } = req.body as { name: string };

  const newPanelId = await addPanelService({
    data: { name },
    id,
    user,
  });

  await addOraclePanelService({id: newPanelId, connectionId: id})

  return reply.send(newPanelId);
}