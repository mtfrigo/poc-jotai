import { useOraclePanelModel } from "./oracle-panel.model";
import { OraclePanelView } from "./oracle-panel.view";
import { InMemoryOracleExecuteService } from "@/test/mock/execution-service";

export const OraclePanel = ({ consoleId }: { consoleId: string }) => {
  const mockService = {
    executeService: new InMemoryOracleExecuteService(),
  };

  const model = useOraclePanelModel({
    consoleId,
    executionService: mockService.executeService,
  });

  return <OraclePanelView {...model} />;
};
