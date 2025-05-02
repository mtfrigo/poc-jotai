import { FastifyRequest, FastifyReply } from "fastify";

import {
  fetchTeamById,
  fetchTeams as fetchTeamsService,
  fetchTeamActivities as fetchTeamActivitiesService,
  fetchTeamMembers as fetchTeamMembersService
} from "../services/teams.service";

export async function fetchTeam(req: FastifyRequest, reply: FastifyReply) {
  const { id } = req.params as { id: string };

  const team = await fetchTeamById(id);

  if(!team) return reply.status(404).send({ error: 'Team not found' });

  return reply.send(team);
}

export async function fetchTeams(req: FastifyRequest, reply: FastifyReply) {
  const teams = await fetchTeamsService();
  return reply.send(teams);
}

export async function fetchTeamActivities(req: FastifyRequest, reply: FastifyReply) {
  const { id } = req.params as { id: string };

  const team = await fetchTeamActivitiesService(id);
  if(!team) return reply.status(404).send({ error: 'Team activities not found' });

  return reply.send(team);
}

export async function fetchTeamMembers(req: FastifyRequest, reply: FastifyReply) {
  const { id } = req.params as { id: string };
  
  const members = await fetchTeamMembersService(id);
  
  if(!members) return reply.status(404).send({ error: 'Team members not found' });

  return reply.send(members);
}