import { usePanelById } from "@/entities/consoles/model/consoles.atoms";
import { generateUUID } from "@/shared/libs/uuid";
import { schemas as consoleSchemas } from "@/entities/consoles";

export const useNewConsole = (panelId?: string) => {
    const [panel, setPanel] = usePanelById(panelId)

    const handleAddConsole = (preffix: string = '') => {
        const id =  generateUUID();
        
        const tab: consoleSchemas.Tab = {
            id,
            label: `${preffix}#${id.slice(-4)}`,
        };
    
        setPanel({
            ...panel,
            tabs: [...(panel?.tabs ?? []), tab],
            activeTab: tab.id,
        });
    };

    return { handleAddConsole }
}