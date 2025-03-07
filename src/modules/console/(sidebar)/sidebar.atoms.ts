import { Connection } from "@/modules/console/schemas/connection";
import { atomWithStorage } from "jotai/utils";

export const connectionsAtom = atomWithStorage<Connection[]>(
  "@connections",
  []
);
connectionsAtom.debugLabel = "connectionsAtom";
