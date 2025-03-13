import { FlavorSchema } from "@/modules/console/schemas/flavor";
import { z } from "zod";

export const LogSchema = z.object({
    id: z.string(),
    flavor: FlavorSchema,
    executedAt: z.coerce.date()
});
  
export type Log = z.infer<typeof LogSchema>;
