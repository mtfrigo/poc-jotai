import { api } from "@/shared/api";
import { FetchConnectionPanelsRequestParams } from "../params/connection-panels.params";
import { ConnectionPanelsDto } from "../dto/panels.dto";
import { mapConnectionPanels } from "../mapper";

export const fetchUserConnectionsPanels = async ({ user,  connectionId, config  }: FetchConnectionPanelsRequestParams) => {
    const res = await  api.get<ConnectionPanelsDto>(`/connections/${user}/panels/${connectionId}`, {
      ...config,
    });

    return mapConnectionPanels(res.data);
}