import { z } from "zod";

export const OracleResultContentSchema = z.object({
  headers: z.array(z.string()),
  rows: z.array(z.record(z.string(), z.any())),
});

export const MongoExecuteBodySchema = z.object({
  find: z.object({
    filter: z.string().optional(),
    projection: z.string().optional(),
    sort: z.string().optional(),
  }),
});

export const OracleExecuteBodySchema = z.object({
  connectionId: z.string(),
  body: z.object({
    statement: z.string(),
  }),
});

export type OracleExecuteBody = z.infer<typeof OracleExecuteBodySchema>;
export type MongoExecuteBody = z.infer<typeof MongoExecuteBodySchema>;
export type OracleExecutionResult = z.infer<typeof OracleResultContentSchema>;

export type OracleExecuteServiceContract = {
  exec: (body: OracleExecuteBody) => Promise<OracleExecutionResult>;
};
