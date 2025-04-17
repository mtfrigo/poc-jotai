import { OracleConsoleSchema } from "@/entities/oracle/model/console.schema";
import { z } from "zod";


export const ConsoleSchema = z.discriminatedUnion("flavor", [
    OracleConsoleSchema,
]);

export const TabSchema = z.object({
    id: z.string(),
    label: z.string(),
  });
  
export const PanelSchema = z.object({
  tabs: z.array(TabSchema),
  activeTab: z.string().nullish()
});

export type Console = z.infer<typeof ConsoleSchema>;
export type Tab = z.infer<typeof TabSchema>;
export type Panel = z.infer<typeof PanelSchema>;
