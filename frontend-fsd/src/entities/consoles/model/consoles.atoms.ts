import { atom, useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { Panel } from "./consoles.schema";
import { useMemo } from "react";


export const panelsAtom = atomWithStorage<Record<string, Panel>>('@panels', {});
panelsAtom.debugLabel = "panelsAtom";

export const panelByIdAtom = (id?: string) => atom(
  (get) => {
    const panel: Panel = { tabs: [] }

    if(!id) return panel;

    return get(panelsAtom)[id] ?? panel
  },
  (_, set, value: Panel) => {
    if(id) {
        set(panelsAtom, (prev) => ({
          ...prev,
          [id]: value,
        }));
    }
  }
)

export const usePanelById = (id?: string) => useAtom(useMemo(() => panelByIdAtom(id), [id]))