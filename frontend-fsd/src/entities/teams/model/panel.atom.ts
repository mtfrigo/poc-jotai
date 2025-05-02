import { atomWithStorage } from "jotai/utils";
import { OraclePanel } from "./panel.schema";
import { atom, useAtom } from "jotai";
import { useMemo } from "react";

export const oraclePanelsAtom = atomWithStorage<
  Record<string, OraclePanel>
>("@panel-oracle", {});
oraclePanelsAtom.debugLabel = "oraclePanelsAtom";

export const panelByIdAtom = (id: string) => atom(
  (get) => {
    const initialPanel: OraclePanel = {
      id,
      flavor: "ORACLE",
      statement: "",
      schema: null,
    } as OraclePanel;

    return get(oraclePanelsAtom)[id] ?? initialPanel
  },
  (_, set, value: OraclePanel) => {
    set(oraclePanelsAtom, (prev) => ({
      ...prev,
      [id]: value,
    }));
  }
)

export const usePanelById = (id: string) => {
  const [panel, setPanel ] =  useAtom(useMemo(() => panelByIdAtom(id), [id]))

  return {
    panel,
    setPanel
  }
}