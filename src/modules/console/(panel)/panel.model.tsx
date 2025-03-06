import { useAtom, useAtomValue } from "jotai";

import { activeConnectionAtom } from "../console.atoms";
import { panelAtom } from "./panel.atoms";
import { v4 as uuidv4 } from "uuid";
import { Tab } from "@/modules/console/schemas/tab";

export const usePanelModel = () => {
  const connection = useAtomValue(activeConnectionAtom)
  const [panel, setPanel] = useAtom(panelAtom)


  const handleSelectTab = (id: string) => {
    if(!panel) return;

    setPanel({...panel, activeTab: id})
  }

  const handleAddTab = () => {
    const tab: Tab = {
      id: uuidv4(),
      label: connection?.name ?? 'Tab'
    }

    setPanel({
      ...panel,
      tabs: [
        ...panel?.tabs ?? [],
        tab
      ],
      activeTab: tab.id,
    })
  }

  const handleResetTabs = () => {
    setPanel({
      ...panel,
      tabs: [],
      activeTab: null,
    })
  }

  return {
    connection,
    panel,

    handleAddTab,
    handleResetTabs,
    handleSelectTab
  };
};
