import { AxiosHttpClientAdapter } from "@/infra/http/axios-client.adapter";
import { useLogsModel } from "./logs.model";
import { LogsView } from "./logs.view";
import { FetchExecutionsService } from "../console/api/execution/execution.service";

export const Logs = () => {
  const httpClient = new AxiosHttpClientAdapter();

  const listExecutions = new FetchExecutionsService(httpClient);

  const model = useLogsModel({
    service: {
      listExecutions,
    },
  });
  return <LogsView {...model} />;
};
