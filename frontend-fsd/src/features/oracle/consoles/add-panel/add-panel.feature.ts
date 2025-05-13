import { useAddPanelMutation } from "./add-panel.mutation";
import { CONFIG } from "@/shared/config/auth";


export const useAddPanel = () => {
  const { mutate } = useAddPanelMutation()

  const handleAddPanel = (data: { id: string, name: string }) => {

    mutate({
      user: CONFIG.username,
      id: data.id,
      name: data.name,
    })
  };

  return { handleAddPanel };
};