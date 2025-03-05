import { Connection } from "@/domain/models/connection";
import { atom } from "jotai";

export const connectionsAtom = atom<Connection[]>([]);
connectionsAtom.debugLabel = "connectionsAtom";
