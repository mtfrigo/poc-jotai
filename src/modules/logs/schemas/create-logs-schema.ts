import { FlavorSchema } from "@/modules/console/schemas/flavor";
import { z } from "zod";


export const CreateLogSchema = z.object({
    flavor: FlavorSchema,
    executedAt: z.coerce.date(),
    // id: z.string(),
    // createdAt: z.coerce.date(),
}) 

export type CreateLog = z.infer<typeof CreateLogSchema>