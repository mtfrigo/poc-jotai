import { api } from "@/shared/api";
import { FetchUserConnectionsRequestParams } from "../params/user-connections.params";
import { UserConnectionsDto } from "../dto/connections.dto";
import { mapUserConnections } from "../mapper";

export const fetchUserConnections = async ({ user, config  }: FetchUserConnectionsRequestParams) => {
    const res = await  api.get<UserConnectionsDto>(`/connections/${user}`, {
      ...config,
    });



    return mapUserConnections(res.data);
}