import { Connection } from "@/domain/models/connection";
import { OraclePanel } from "./(oracle)/oracle-panel.view-model";
import { MongoPanel } from "./(mongo)/mongo-panel.view-model";
import { useCallback } from "react";
import { usePanelModel } from "./panel.model";

export const Panel = (connection: Connection) => {
  const model = usePanelModel(connection.id);

  const getFlavorPanel = useCallback(() => {
    switch (connection.flavor) {
      case "MONGO":
        return <MongoPanel connection={connection} />;
      case "ORACLE":
        return <OraclePanel connection={connection} />;
      default:
        return <div>Unknown flavor</div>;
    }
  }, [connection]);

  return <>{getFlavorPanel()}</>;
};
