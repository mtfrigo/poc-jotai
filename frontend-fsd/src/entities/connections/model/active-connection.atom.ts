import { schemas } from "@/entities/connections";
import { useAtomValue } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const activeConnectionAtom = atomWithStorage<null | schemas.Connection>('@active-connection', null);
activeConnectionAtom.debugLabel = "activeConnectionAtom";

export const useActiveConnection = () => useAtomValue(activeConnectionAtom)