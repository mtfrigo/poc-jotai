import { z } from "zod";
import { TabSchema } from "./tab";

export const PanelSchema = z.object({
  tabs: z.array(TabSchema),
  activeTab: z.string().nullish()
});

export type Panel = z.infer<typeof PanelSchema>;
