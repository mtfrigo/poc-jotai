import { useMongoPanelModel } from "./mongo-panel.model";

export const MongoPanelView = ({
  label,
}: ReturnType<typeof useMongoPanelModel>) => {
  return <div className="flex flex-1 items-center justify-center">{label}</div>;
};
