import { OraclePanelSchema } from "@/entities/oracle/model/panel.schema";
import { z } from "zod";


export const PanelSchema = z.discriminatedUnion("flavor", [
  OraclePanelSchema,
]);

export const TabSchema = z.object({
    id: z.string(),
    label: z.string(),
});
  
export const ConnectionPanelsSchema = z.array(TabSchema);
export const ActiveConnectionPanelSchema = z.record(z.string(), z.string().nullable());
export const PanelStateSchema = z.record(z.string(), z.boolean());

export type Console = z.infer<typeof PanelSchema>;
export type Tab = z.infer<typeof TabSchema>;
export type ConnectionPanels = z.infer<typeof ConnectionPanelsSchema>;
export type ActiveConnectionPanelSchema = z.infer<typeof ActiveConnectionPanelSchema>;
export type PanelState = z.infer<typeof PanelStateSchema>;
