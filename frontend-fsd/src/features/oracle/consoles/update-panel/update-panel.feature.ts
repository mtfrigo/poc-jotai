import { useUpdatePanelMutation } from "./update-panel.mutation";
import { CONFIG } from "@/shared/config/auth";


type UpdateData = { 
  statement?: string | null, 
  schema?: string | null,
  executionId?: string | null 
}

export const useUpdatePanel = () => {
  const { mutate } = useUpdatePanelMutation()

  const handleUpdatePanel = (id: string, data: UpdateData) => {

    mutate({
      id,
      user: CONFIG.username,
      statement: data.statement ?? undefined,
      schema: data.schema ?? undefined,
      executionId: data.executionId ?? undefined
    })
  };

  return { handleUpdatePanel };
};