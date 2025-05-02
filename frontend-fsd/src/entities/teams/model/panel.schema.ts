import { FlavorSchema } from "@/entities/connections/model/connection.schema";
import { z } from "zod";

export const OraclePanelSchema = z.object({
    id: z.string(),
    createdAt: z.coerce.date().optional(),
    executedAt: z.coerce.date().optional(),
    flavor: z.literal(FlavorSchema.Enum.ORACLE),
    schema: z.string().nullish(),
    statement: z.string().nullish(),
    executionId: z.string().nullish(),
    // preferences: z.object({
    //     orientation: ...,
    //     theme: ...,
        
    // })
    // result: OracleResultSchema.nullish(),
});

export type OraclePanel = z.infer<typeof OraclePanelSchema>;
