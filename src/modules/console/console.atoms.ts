import { Connection } from "@/modules/console/schemas/connection";
import { atom } from "jotai";

export const activeConnectionAtom = atom<null | Connection>(null);
activeConnectionAtom.debugLabel = "activeConnectionAtom";
