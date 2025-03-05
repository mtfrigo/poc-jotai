import { z } from "zod";
import { TabSchema } from "./tab";

export const PanelSchema = z.object({
  tabs: z.array(TabSchema),
});

export type Panel = z.infer<typeof PanelSchema>;
