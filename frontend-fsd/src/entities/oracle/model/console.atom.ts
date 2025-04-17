import { atomWithStorage } from "jotai/utils";
import { OracleConsole } from "./console.schema";
import { atom, useAtom } from "jotai";
import { useMemo } from "react";

export const oracleConsolesAtom = atomWithStorage<
  Record<string, OracleConsole>
>("@oracle-consoles", {});
oracleConsolesAtom.debugLabel = "oracleConsolesAtom";

export const consoleByIdAtom = (id: string) => atom(
  (get) => {
    const initialConsole: OracleConsole = {
      id,
      flavor: "ORACLE",
      statement: "",
      schema: null,
      status: "IDLE",
    } as OracleConsole;

    return get(oracleConsolesAtom)[id] ?? initialConsole
  },
  (_, set, value: OracleConsole) => {
    set(oracleConsolesAtom, (prev) => ({
      ...prev,
      [id]: value,
    }));
  }
)

export const useConsoleById = (id: string) => {
  const [console, setConsole ] =  useAtom(useMemo(() => consoleByIdAtom(id), [id]))

  return {
    console,
    canRefresh: ["ERROR", "SUCCESS"].includes(console.status),
    canExecute: console.status !== "PENDING",
    setConsole
  }
}