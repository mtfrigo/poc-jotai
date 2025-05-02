import { api } from "@/shared/api";
import { FetchTeamRequestParams } from "../query/teams.params";
import { ActivitiesDto } from "../dto/activities.dto";
import { TeamActivitiesNotFound } from "../errors/TeamActivitiesNotFound";

export const fetchTeamActivities = async ({  id,  config }: FetchTeamRequestParams) => {
  const res = await api.get<ActivitiesDto>(`/team/${id}/activities`, {
    ...config,
  })
  .then((r) => r.data)
  .catch((err) => {
    if (err.status === 404) {
      throw new TeamActivitiesNotFound(`Team activities with id "${id}" not found!`)
    }
    throw err
  })

  return res;
};
