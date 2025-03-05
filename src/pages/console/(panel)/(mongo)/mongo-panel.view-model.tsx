import { Connection } from "@/domain/models/connection";
import { useMongoPanelModel } from "./mongo-panel.model";
import { MongoPanelView } from "./mongo-panel.view";

export const MongoPanel = ({ connection }: { connection: Connection }) => {
  const model = useMongoPanelModel();

  return <MongoPanelView {...model} />;
};
