import { z } from "zod";

export const OraclePanelDtoSchema = z.object({
  statement: z.string().nullish(),
  schema: z.string().nullish(),
  executionId: z.string().nullish(),
});
  
export type OraclePanelDto = z.infer<typeof OraclePanelDtoSchema>;
