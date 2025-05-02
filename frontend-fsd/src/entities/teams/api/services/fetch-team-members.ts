import { api } from "@/shared/api";
import { FetchTeamRequestParams } from "../query/teams.params";
import { MembersDto } from "../dto/member.dto";
import { TeamMembersNotFound } from "../errors/TeamMembersNotFound";

export const fetchTeamMembers = async ({  id,  config }: FetchTeamRequestParams) => {
  const res = await api.get<MembersDto>(`/team/${id}/members`, {
    ...config,
  })
  .then((r) => r.data)
  .catch((err) => {
    if (err.status === 404) {
      throw new TeamMembersNotFound(`Team members with id "${id}" not found!`)
    }
    throw err
  })

  return res;
};
