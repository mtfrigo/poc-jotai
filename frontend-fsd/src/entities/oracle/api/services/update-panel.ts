import { api } from "@/shared/api";
import { UpdatePanelRequestParams } from "../query/oracle.params";
import { OraclePanelDto } from "../dto/panel.dto";

export const updatePanel = async ({ id, schema, statement,  executionId, user, config }: UpdatePanelRequestParams) => {
  
  const res = await api.put<OraclePanelDto>(`/console/${user}/oracle/${id}`, {
    statement, 
    schema,
    executionId
  }, {
    ...config,
  });

  return res.data;
};
