import { z } from "zod";
import { FlavorSchema } from "./flavor";
import { OracleExecuteBodySchema, OracleResultContentSchema } from "@/data/execution-service/execution.contracts";

export const BaseConsoleSchema = z.object({
  id: z.string(),
  createdAt: z.coerce.date().optional(),
  executedAt: z.coerce.date().optional(),
});

export const OracleResultSchema = z.object({
  content: OracleResultContentSchema.nullish(),
  input: OracleExecuteBodySchema
})

export const OracleConsoleSchema = BaseConsoleSchema.extend({
  flavor: z.literal(FlavorSchema.Enum.ORACLE),
  schema: z.string().nullish(),
  statement: z.string().nullish(),
  status: z.enum(['IDLE', 'PENDING', 'SUCCESS', 'ERROR']).default('IDLE'),
  result: OracleResultSchema.nullish(),
});

export const MongoConsoleSchema = BaseConsoleSchema.extend({
  flavor: z.literal(FlavorSchema.Enum.MONGO),
  collection: z.string().nullish(),
  find: z.object({
    filter: z.string().nullish(),
    projection: z.string().nullish(),
    sort: z.string().nullish(),
  }),
});

export const ConsoleSchema = z.discriminatedUnion("flavor", [
  OracleConsoleSchema,
  MongoConsoleSchema,
]);

export type Console = z.infer<typeof ConsoleSchema>;
export type MongoConsole = z.infer<typeof MongoConsoleSchema>;
export type OracleConsole = z.infer<typeof OracleConsoleSchema>;
