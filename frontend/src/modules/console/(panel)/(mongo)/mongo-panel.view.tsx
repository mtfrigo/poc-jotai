import { useMongoPanelModel } from "./mongo-panel.model";

export const MongoPanelView = ({
  label,
}: ReturnType<typeof useMongoPanelModel>) => {
  return <div data-testid="mongo-console" className="flex flex-1 items-center justify-center">{label}</div>;
};
