import { Panel } from "@/domain/models/panel";
import { atom } from "jotai";

export const panelIdAtom = atom<string | null>(null);
panelIdAtom.debugLabel = "panelIdAtom";

export const panelsAtom = atom<Record<string, Panel>>({});
panelsAtom.debugLabel = "panelsAtom";
