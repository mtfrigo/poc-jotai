import { Connection } from "@/domain/models/connection";
import { useOraclePanelModel } from "./oracle-panel.model";
import { OraclePanelView } from "./oracle-panel.view";
import { InMemoryExecuteService } from "@/test/mock/execution-service";

export const OraclePanel = ({ connection }: { connection: Connection }) => {
  const mockService = {
    executeService: new InMemoryExecuteService(),
  };

  const model = useOraclePanelModel({
    connection,
    executionService: mockService.executeService,
  });

  return <OraclePanelView {...model} />;
};
