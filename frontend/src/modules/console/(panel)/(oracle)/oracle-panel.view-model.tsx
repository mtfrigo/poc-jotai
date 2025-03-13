import { useOraclePanelModel } from "./oracle-panel.model";
import { OraclePanelView } from "./oracle-panel.view";
import { AxiosHttpClientAdapter } from "@/infra/http/axios-client.adapter";
import {
  FetchExecutionService,
  OracleExecuteService,
} from "../../api/execution/execution.service";

export const OraclePanel = ({ consoleId }: { consoleId: string }) => {
  const httpAdapter = new AxiosHttpClientAdapter();

  const executionService = new OracleExecuteService(httpAdapter);
  const fetchExecutionService = new FetchExecutionService(httpAdapter);

  const model = useOraclePanelModel({
    consoleId,
    services: {
      executionService,
      fetchExecutionService,
    },
  });

  return <OraclePanelView {...model} />;
};
