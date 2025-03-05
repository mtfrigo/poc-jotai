import { useAtom, useSetAtom } from "jotai";
import { panelIdAtom, panelsAtom } from "./panel.atoms";
import { useEffect } from "react";

export const usePanelModel = (connectionId: string) => {
  const [panelId, setPanelId] = useAtom(panelIdAtom);
  const [panels, setPanels] = useAtom(panelsAtom);

  useEffect(() => {
    setPanelId(connectionId);

    return () => {
      setPanelId(null);
    };
  }, [connectionId, setPanelId]);

  useEffect(() => {
    if (panelId) {
      console.log({ panelId });
    }
  }, [panelId]);

  return {};
};
