import { FastifyInstance } from "fastify";
import {
  fetchTeam,
  fetchTeams,
  fetchTeamActivities,
  fetchTeamMembers
} from "../controllers/teams.controller";

export default async function executionRoutes(fastify: FastifyInstance) {
  fastify.get("/", fetchTeams);
  fastify.get("/:id", fetchTeam);
  fastify.get("/:id/members", fetchTeamMembers);
  fastify.get("/:id/activities", fetchTeamActivities);
}
