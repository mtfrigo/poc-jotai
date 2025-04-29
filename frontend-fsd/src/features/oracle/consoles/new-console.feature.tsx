import { useActiveConnectionPanelById, usePanelById } from "@/entities/panels/model/panels.atoms";
import { generateUUID } from "@/shared/libs/uuid";
import { schemas as consoleSchemas } from "@/entities/panels";

export const useNewConsole = (panelId?: string) => {
    const [panel, setPanel] = usePanelById(panelId)
    const [ _, setActivePanel] = useActiveConnectionPanelById(panelId)

    const handleAddConsole = (preffix: string = '') => {
        const id =  generateUUID();
        
        const tab: consoleSchemas.Tab = {
            id,
            label: `${preffix}#${id.slice(-4)}`,
        };
    
        setPanel([...panel, tab]);
        setActivePanel(id)
    };

    return { handleAddConsole }
}