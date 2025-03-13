import { FlavorSchema } from "@/modules/console/schemas/flavor";
import { z } from "zod";

export const LogsFiltersSchema = z.object({
    id: z.string().nullish(),
    flavor: FlavorSchema.nullish()
});

export type LogsFilters = z.infer<typeof LogsFiltersSchema>;
