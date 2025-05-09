import { z } from "zod";

export const ConnectionPanelsDtoSchema = z.object({
  id: z.string(),
  panels: z.array(z.object({
    id: z.string(),
    label: z.string(),
  })),
});
  
export type ConnectionPanelsDto = z.infer<typeof ConnectionPanelsDtoSchema>;
