import { api } from "@/shared/api";
import { FetchContentRequestParams } from "../query/oracle.params";
import { OracleContentDto } from "../dto/content.dto";

export const fetchContent = async ({ id, config }: FetchContentRequestParams) => {
  const res = await api.get<OracleContentDto>(`/execution/content/${id}`, {
    ...config,
  });

  await new Promise((resolve) => {setTimeout(resolve, 1000)})

  return res.data;
};
