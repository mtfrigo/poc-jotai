import { useState } from "react";
import { LogsFilters } from "./schemas/logs-filters";
import { useQuery } from "@tanstack/react-query";
import { FetchExecutionsService } from "../console/api/execution/execution.service";
import { ExecutionResponse } from "../console/api/execution/execution.contracts";

const QUERY_KEYS = {
  LIST_LOGS: "logs",
};

type Props = {
  service: {
    listExecutions: FetchExecutionsService;
  };
};

export const useLogsModel = ({ service }: Props) => {
  const filters = useState<LogsFilters>({
    flavor: "ORACLE",
  });

  const { data: listLogs } = useQuery<Array<ExecutionResponse>>({
    queryKey: [QUERY_KEYS.LIST_LOGS],
    queryFn: () => service.listExecutions.exec(),
  });

  return {
    logs: listLogs,
  };
};
