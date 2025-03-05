import { z } from "zod";

export const OracleExecuteBodySchema = z.object({
  statement: z.string(),
});

export const OracleExecutionResultSchema = z.object({
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

export const ExecuteBodySchema = z.object({
  connectionId: z.string(),
  body: z.union([OracleExecuteBodySchema, MongoExecuteBodySchema]),
});

export type OracleExecuteBody = z.infer<typeof OracleExecuteBodySchema>;
export type MongoExecuteBody = z.infer<typeof MongoExecuteBodySchema>;
export type ExecuteBody = z.infer<typeof ExecuteBodySchema>;
export type OracleExecutionResult = z.infer<typeof OracleExecutionResultSchema>;

export type ExecuteServiceContract = {
  exec: (body: ExecuteBody) => Promise<OracleExecutionResult>;
};
