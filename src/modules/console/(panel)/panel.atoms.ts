import { Panel } from "@/modules/console/schemas/panel";
import { atom } from "jotai";
import { activeConnectionAtom } from "../console.atoms";
import { atomWithStorage } from "jotai/utils";


export const panelsAtom = atomWithStorage<Record<string, Panel>>('@panels', {});
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
