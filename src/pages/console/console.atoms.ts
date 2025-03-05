import { Connection } from "@/domain/models/connection";
import { atom } from "jotai";

export const activeConnectionAtom = atom<null | Connection>(null);
activeConnectionAtom.debugLabel = "activeConnectionAtom";
