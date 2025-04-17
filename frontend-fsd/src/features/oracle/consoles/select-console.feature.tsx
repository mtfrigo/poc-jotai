import { usePanelById } from "@/entities/consoles/model/consoles.atoms";


export const useSelectPanelTab = (panelId?: string) => {
    const [panel, setPanel] = usePanelById(panelId)

    const handleSelectTab = (tabId: string) => {
        if (!panel) return;
    
        setPanel({ ...panel, activeTab: tabId });
    };

    return { handleSelectTab }
}