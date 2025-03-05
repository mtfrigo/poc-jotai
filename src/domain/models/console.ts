import { z } from "zod";
import { FlavorSchema } from "./flavor";
import { OracleExecutionResultSchema } from "@/data/execution-service/execution.contracts";

export const BaseConsoleSchema = z.object({
  id: z.string(),
  createdAt: z.coerce.date().optional(),
  executedAt: z.coerce.date().optional(),
});

export const OracleConsoleSchema = BaseConsoleSchema.extend({
  flavor: z.literal(FlavorSchema.Enum.ORACLE),
  schema: z.string().nullish(),
  statement: z.string().nullish(),
  result: OracleExecutionResultSchema.nullish(),
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
