import { api } from "@/shared/api";
import { FetchTeamsQueryRequest } from "../query/teams.params";
import { TeamsDto } from "../dto/team.dto";

export const fetchTeams = async ({  config }: FetchTeamsQueryRequest) => {
  const res = await api.get<TeamsDto>(`/team`, {
    ...config,
  });

  return res.data;
};
