import { atom, useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { ConnectionPanels } from "./panels.schema";
import { useMemo } from "react";


export const connectionPanels = atomWithStorage<Record<string, ConnectionPanels>>('@connection-panels', {});
connectionPanels.debugLabel = "connectionPanels";

export const activeConnectionPanel = atomWithStorage<Record<string, string | null >>('@active-connection-panel', {})
activeConnectionPanel.debugLabel = "activeConnectionPanel";

export const panelState = atomWithStorage<Record<string, { isLoading: boolean, loadingMessage: string} >>('@panel-state', {})
panelState.debugLabel = "panelState";

export const panelByIdAtom = (id?: string) => atom(
  (get) => {
    const panel: ConnectionPanels = []

    if(!id) return panel;

    return get(connectionPanels)[id] ?? panel
  },
  (_, set, value: ConnectionPanels) => {
    if(id) {
        set(connectionPanels, (prev) => ({
          ...prev,
          [id]: value,
        }));
    }
  }
)

export const usePanelById = (id?: string) => useAtom(useMemo(() => panelByIdAtom(id), [id]))

export const activeConnectionPanelByIdAtom = (id?: string) => atom(
  (get) => {
    const panel: string | null = null

    if(!id) return panel;

    return get(activeConnectionPanel)[id] ?? panel
  },
  (_, set, value: string | null) => {

    if(id) {
        set(activeConnectionPanel, (prev) => ({
          ...prev,
          [id]: value,
        }));
    }
  }
)

export const useActiveConnectionPanelById = (id?: string) => useAtom(useMemo(() => activeConnectionPanelByIdAtom(id), [id]))

export const panelStateByIdAtom = (id?: string) => atom(
  (get) => {
    const state = {
      loadingMessage: '',
      isLoading: false
    }

    if(!id) return state;

    return get(panelState)[id] ?? state
  },
  (_, set, value: { isLoading: boolean, loadingMessage: string}) => {
    if(id) {
        set(panelState, (prev) => ({
          ...prev,
          [id]: {...value},
        }));
    }
  }
)

export const usePanelStateById = (id?: string) => useAtom(useMemo(() => panelStateByIdAtom(id), [id]))