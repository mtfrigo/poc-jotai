import { useMongoPanelModel } from "./mongo-panel.model";
import { MongoPanelView } from "./mongo-panel.view";

export const MongoPanel = ({ consoleId }: { consoleId: string }) => {
  const model = useMongoPanelModel({
    consoleId,
  });

  return <MongoPanelView {...model} />;
};
