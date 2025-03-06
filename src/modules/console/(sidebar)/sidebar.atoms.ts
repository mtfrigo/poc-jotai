import { Connection } from "@/modules/console/schemas/connection";
import { atom } from "jotai";

export const connectionsAtom = atom<Connection[]>([]);
connectionsAtom.debugLabel = "connectionsAtom";
