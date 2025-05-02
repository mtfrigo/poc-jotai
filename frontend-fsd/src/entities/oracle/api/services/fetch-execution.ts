import { api } from "@/shared/api";
import { FetchExecutionRequestParams } from "../query/oracle.params";
import { OracleExecutionResponseDto } from "../dto/execution.dto";

export const fetchExecution = async ({ id, config  }: FetchExecutionRequestParams) => {
    const res = await  api.get<OracleExecutionResponseDto>(`/execution/${id}`, {
      ...config,
    });

    return res.data;
}