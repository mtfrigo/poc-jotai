import { FastifyRequest, FastifyReply } from "fastify";

import {
  addUserConnection,
  fetchUserConnections as fetchUserConnectionsService
} from "../services/user-connections.service";

export async function fetchUserConnections(req: FastifyRequest, reply: FastifyReply) {
  const { user } = req.params as { user: string };

  const connections = await fetchUserConnectionsService(user);

  return reply.send(connections);
}

export async function addConnection(req: FastifyRequest, reply: FastifyReply) {
  const { user } = req.params as { user: string };

  const { favorite, flavor, name} = req.body as { name: string,  flavor: 'ORACLE' | 'MONGO' | 'KAFKA', favorite: boolean };

  const connection = await addUserConnection({ 
    flavor,
    name,
    user,
    favorite
  });

  return reply.send(connection);
}
