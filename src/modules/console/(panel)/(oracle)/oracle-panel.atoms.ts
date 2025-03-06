import { OracleConsole } from "@/modules/console/schemas/console";
import { atom } from "jotai";
import { activeConnectionAtom } from "../../console.atoms";

export const oracleConsolesAtom = atom<Record<string, OracleConsole>>({});
oracleConsolesAtom.debugLabel = "oracleConsolesAtom";

export const consoleIdAtom = atom<string | null>(null);
consoleIdAtom.debugLabel = "consoleIdAtom";

export const oracleConsoleAtom = atom(
  (get) => {
    const connection = get(activeConnectionAtom);
    const consoleId = get(consoleIdAtom);
    const oracleConsoles = get(oracleConsolesAtom);

    const initialConsole: OracleConsole = {
      id: consoleId,
      flavor: "ORACLE",
      statement: "",
      schema: null,
      status: 'IDLE'
    } as OracleConsole

    if (!connection || !consoleId) return initialConsole;

    const oracleConsole = oracleConsoles[consoleId];

    return (
      oracleConsole ?? initialConsole
    );
  },
  (get, set, value: OracleConsole) => {
    const consoleId = get(consoleIdAtom);

    if(!consoleId) return;

    set(oracleConsolesAtom, (prev) => ({
      ...prev,
      [consoleId]: value,
    }));
  }
);
oracleConsoleAtom.debugLabel = "oracleConsoleAtom";
