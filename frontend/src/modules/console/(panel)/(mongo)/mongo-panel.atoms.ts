import { MongoConsole } from "@/modules/console/schemas/console";
import { atom } from "jotai";
import { activeConnectionAtom } from "../../console.atoms";
import { atomWithStorage } from "jotai/utils";

export const mongoConsolesAtom = atomWithStorage<Record<string, MongoConsole>>(
  "@mongo-consoles",
  {}
);
mongoConsolesAtom.debugLabel = "mongoConsolesAtom";

export const consoleIdAtom = atom<string | null>(null);
consoleIdAtom.debugLabel = "mongoConsoleIdAtom";

export const mongoConsoleAtom = atom(
  (get) => {
    const connection = get(activeConnectionAtom);
    const consoleId = get(consoleIdAtom);
    const mongoConsoles = get(mongoConsolesAtom);

    const initialConsole: MongoConsole = {
      id: consoleId,
      flavor: "MONGO",
      find: "",
      collection: "",
      status: "IDLE",
    } as MongoConsole;

    if (!connection || !consoleId) return initialConsole;

    const mongoConsole = mongoConsoles[consoleId];

    return mongoConsole ?? initialConsole;
  },
  (get, set, value: MongoConsole) => {
    const consoleId = get(consoleIdAtom);

    if (!consoleId) return;

    set(mongoConsolesAtom, (prev) => ({
      ...prev,
      [consoleId]: value,
    }));
  }
);
mongoConsoleAtom.debugLabel = "mongoConsoleAtom";
