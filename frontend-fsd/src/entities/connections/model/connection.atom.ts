import { atomWithStorage } from "jotai/utils";
import { Connection } from "./connection.schema";

export const connections = atomWithStorage<Connection[]>(
  "@connections",
  []
);
connections.debugLabel = "connectionsAtom";
