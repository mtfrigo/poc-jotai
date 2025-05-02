import { fetchTeams } from "./services/fetch-teams";
import { fetchTeam } from "./services/fetch-team";
import { fetchTeamActivities } from "./services/fetch-team-activities";
import { fetchTeamMembers } from "./services/fetch-team-members";

export const TeamService = {
  fetchTeams,
  fetchTeam,
  fetchTeamActivities,
  fetchTeamMembers
};
