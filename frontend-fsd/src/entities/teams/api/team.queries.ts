import { queryOptions } from "@tanstack/react-query";
import { TeamService } from "./teams.service";
import {  FetchTeamQueryParams, FetchTeamActivitiesQueryParams, FetchTeamMembersQueryParams} from "./query/teams.params";

export const TeamsQueries = {
  all: () => ['teams'],
  
  fetchTeams: () => 
    queryOptions({
      queryKey: [...TeamsQueries.all()],
      queryFn: async () => TeamService.fetchTeams({}),
    }),
    
    fetchTeam: ({ id }: FetchTeamQueryParams ) => 
      queryOptions({
        queryKey: [...TeamsQueries.all(), id],
        queryFn: async () => TeamService.fetchTeam({ id }),
    }),

    fetchTeamMembers: ({ id }: FetchTeamMembersQueryParams ) => 
      queryOptions({
        queryKey: [...TeamsQueries.all(), id, 'members'],
        queryFn: async () => TeamService.fetchTeamMembers({ id }),
    }),

    fetchTeamActivities: ({ id }: FetchTeamActivitiesQueryParams ) => 
      queryOptions({
        queryKey: [...TeamsQueries.all(), id, 'activities'],
        queryFn: async () => TeamService.fetchTeamActivities({ id }),
    })
};
