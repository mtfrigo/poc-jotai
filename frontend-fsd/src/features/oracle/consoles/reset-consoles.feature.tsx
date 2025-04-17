import { usePanelById } from "@/entities/consoles/model/consoles.atoms";

export const useResetConsoles = (panelId?: string) => {
    const [panel, setPanel] = usePanelById(panelId)

    const onResetConsoles = () => {
        setPanel({
            ...panel,
            tabs: [],
            activeTab: null,
        });
    };

    return { onResetConsoles }
}