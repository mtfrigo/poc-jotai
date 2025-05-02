import { z } from "zod";

export const OracleExecuteBodySchema = z.object({
  statement: z.string(),
})

export const OracleExecuteSchema = z.object({
  connectionId: z.string(),
  body: OracleExecuteBodySchema
});

export const OracleExecutionResponseSchema = z.object({
    resourceId: z.string(),
    flavor: z.literal('ORACLE'),
    status: z.enum(["PENDING", "SUCCESS", "ERROR"]),
    createdAt: z.coerce.date(),
    finishedAt: z.coerce.date().optional(),
    id: z.string(),
  });

export const OracleResultContentSchema = z.object({
  headers: z.array(z.string()),
  rows: z.array(z.record(z.string(), z.any())),
});
  

export type OracleExecuteBody = z.infer<typeof OracleExecuteBodySchema>;
export type OracleExecute = z.infer<typeof OracleExecuteSchema>;
export type OracleExecutionResponse = z.infer<typeof OracleExecutionResponseSchema>;
export type OracleResultContent = z.infer<typeof OracleResultContentSchema>;