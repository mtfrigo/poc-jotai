import { Connection } from "@/modules/console/schemas/connection";
import { atomWithStorage } from "jotai/utils";

export const activeConnectionAtom = atomWithStorage<null | Connection>('@active-connection', null);
activeConnectionAtom.debugLabel = "activeConnectionAtom";
