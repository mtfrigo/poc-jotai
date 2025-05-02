import { api } from "@/shared/api";
import { ExecuteParams } from "../query/oracle.params";

export const execute = async ({ resourceId, statement , config }: ExecuteParams) => {
  const res = await api.post(
    "/execution/oracle",
    {
      resourceId, 
      statement
    },
    {
      ...config,
    }
  );

  return res.data;
};
