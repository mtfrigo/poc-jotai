import { z } from "zod";

export const OracleExecutionResponseDtoSchema = z.object({
    resourceId: z.string(),
    flavor: z.literal('ORACLE'),
    status: z.enum(["PENDING", "SUCCESS", "ERROR"]),
    createdAt: z.coerce.date(),
    finishedAt: z.coerce.date().optional(),
    id: z.string(),
  });
  
export type OracleExecutionResponseDto = z.infer<typeof OracleExecutionResponseDtoSchema>;
