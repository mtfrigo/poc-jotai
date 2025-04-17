import { FlavorSchema } from "@/entities/connections/model/connection.schema";
import { z } from "zod";

export const BaseConsoleSchema = z.object({
    id: z.string(),
    createdAt: z.coerce.date().optional(),
    executedAt: z.coerce.date().optional(),
});

  
export const OracleConsoleSchema = BaseConsoleSchema.extend({
    flavor: z.literal(FlavorSchema.Enum.ORACLE),
    schema: z.string().nullish(),
    statement: z.string().nullish(),
    status: z.enum(["IDLE", "PENDING", "SUCCESS", "ERROR"]).default("IDLE"),
    executionId: z.string().nullish(),
    // result: OracleResultSchema.nullish(),
});

export type OracleConsole = z.infer<typeof OracleConsoleSchema>;
