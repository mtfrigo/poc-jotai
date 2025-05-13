import { api } from "@/shared/api";
import { FetchPanelRequestParams } from "../query/oracle.params";
import { OraclePanelDto } from "../dto/panel.dto";
import { CONFIG } from "@/shared/config/auth";

export const fetchPanel = async ({ id, config }: FetchPanelRequestParams) => {
  const res = await api.get<OraclePanelDto>(`/console/${CONFIG.username}/oracle/${id}`, {
    ...config,
  });

  return res.data;
};
