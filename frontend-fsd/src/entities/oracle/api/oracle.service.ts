import { api } from "@/shared/api";
import { AxiosRequestConfig } from "axios";

import {
  OracleExecutionResponse,
  OracleResultContent,
} from "@/entities/oracle/model/execution.schema";

const execute = (
  data: {
    resourceId: string;
    statement: string;
  },
  config?: AxiosRequestConfig
) => {
  return api.post(
    "/execution/oracle",
    {
      resourceId: data.resourceId,
      statement: data.statement,
    },
    {
      ...config,
    }
  );
};

const fetchById = (
  data: { executionId: string },
  config?: AxiosRequestConfig
) => {
  return api.get<OracleExecutionResponse>(`/execution/${data.executionId}`, {
    ...config,
  });
};

const fetchContent = (
  data: { executionId: string },
  config?: AxiosRequestConfig
) => {
  return api.get<OracleResultContent>(
    `/execution/content/${data.executionId}`,
    {
      ...config,
    }
  );
};

export const OracleService = {
  execute,
  fetchById,
  fetchContent,
};
