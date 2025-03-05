import { Panel } from "@/domain/models/panel";
import { atom } from "jotai";
import { activeConnectionAtom } from "../console.atoms";


export const panelsAtom = atom<Record<string, Panel>>({});
panelsAtom.debugLabel = "panelsAtom";

export const panelAtom = atom(
    (get) => {
        const connection = get(activeConnectionAtom)
        const panels = get(panelsAtom)

        if(!connection) return null

        return panels[connection.id];
    },
    (get, set, value: Panel) => {
        const connection = get(activeConnectionAtom);
        if (!connection) return null;

        set(panelsAtom, 
            (prev) => ({
                ...prev,
                [connection.id]: value
            })
        )
        
    }
);
panelAtom.debugLabel = "panelAtom";
