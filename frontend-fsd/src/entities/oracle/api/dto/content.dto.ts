import { z } from "zod";

export const OracleContentDtoSchema = z.object({
  headers: z.array(z.string()),
  rows: z.array(z.record(z.string(), z.any())),
});
  
export type OracleContentDto = z.infer<typeof OracleContentDtoSchema>;
