import { InMemoryCreateLogs } from "@/test/mock/api/logs/logs.service";
import { useOraclePanelModel } from "./oracle-panel.model";
import { OraclePanelView } from "./oracle-panel.view";
import { InMemoryOracleExecuteService } from "@/test/mock/api/execution/execution.service";

export const OraclePanel = ({ consoleId }: { consoleId: string }) => {
  const mockService = {
    executeService: new InMemoryOracleExecuteService(),
    createLogService: new InMemoryCreateLogs()
  };

  const model = useOraclePanelModel({
    consoleId,
    executionService: mockService.executeService,
    createLogService: mockService.createLogService
  });

  return <OraclePanelView {...model} />;
};
