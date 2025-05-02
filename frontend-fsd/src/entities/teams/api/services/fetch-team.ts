import { api } from "@/shared/api";
import { FetchTeamRequestParams } from "../query/teams.params";
import { TeamDto } from "../dto/team.dto";
import { TeamNotFoundError } from "../errors/TeamNotFoundError";

export const fetchTeam = async ({  id,  config }: FetchTeamRequestParams) => {
  const res = await api.get<TeamDto>(`/team/${id}`, {
    ...config,
  })
  .then((r) => r.data)
  .catch((err) => {
    if (err.status === 404) {
      throw new TeamNotFoundError(`Team with id "${id}" not found!`)
    }
    throw err
  })

  return res;
};
