
import { usePanelModel } from "./panel.model";
import { PanelView } from "./panel.view";

export const Panel = () => {
  const model = usePanelModel();

  return <PanelView {...model} />;
};
