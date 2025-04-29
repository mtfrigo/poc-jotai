import { useActiveConnectionPanelById } from "@/entities/panels/model/panels.atoms";


export const useSelectPanelTab = (panelId?: string) => {
    const [activePanel, setActivePanel] = useActiveConnectionPanelById(panelId)

    const handleSelectTab = (tabId: string) => {
        setActivePanel(tabId);
    };

    return { handleSelectTab }
}