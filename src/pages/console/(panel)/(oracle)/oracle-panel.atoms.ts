import { OracleConsole } from "@/domain/models/console";
import { Panel } from "@/domain/models/panel";
import { atom } from "jotai";
import { panelIdAtom } from "../panel.atoms";

export const oraclePanelsAtom = atom<Record<string, Panel>>({});
oraclePanelsAtom.debugLabel = "oraclePanelAtom";

export const oracleConsolesAtom = atom<Record<string, OracleConsole>>({});
oracleConsolesAtom.debugLabel = "oracleConsolesAtom";

export const oraclePanelAtom = atom(
  (get) => {
    const panelId = get(panelIdAtom);
    const panels = get(oraclePanelsAtom);

    if (!panelId)
      return {
        tabs: [],
      };

    return (
      panels[panelId] ?? {
        tabs: [],
      }
    );
  },
  (get, set, value: Panel) => {
    const panelId = get(panelIdAtom);
    if (!panelId) return null;

    set(oraclePanelsAtom, (prev) => ({
      ...prev,
      [panelId]: value,
    }));
  }
);
oraclePanelAtom.debugLabel = "oraclePanelAtom";

export const consoleIdAtom = atom<string | null>(null);
consoleIdAtom.debugLabel = "consoleIdAtom";

export const oracleConsoleAtom = atom(
  (get) => {
    const panelId = get(panelIdAtom);
    const oraclePanel = get(oraclePanelsAtom);
    const oracleConsoles = get(oracleConsolesAtom);

    if (!panelId) return null;

    const oracleConsole = oracleConsoles[oraclePanel[panelId]?.tabs[0].id];

    return (
      oracleConsole ?? {
        id: "DRAFT", // INITIAL VALUE
        flavor: "ORACLE",
        statement: "",
        schema: null,
      }
    );
  },
  (get, set, value: OracleConsole) => {
    const consoleId = get(consoleIdAtom);

    set(oracleConsolesAtom, (prev) => ({
      ...prev,
      [consoleId ?? "DRAFT"]: value,
    }));
  }
);
oracleConsoleAtom.debugLabel = "oracleConsoleAtom";
