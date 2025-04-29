import { useActiveConnectionPanelById, usePanelById } from "@/entities/panels/model/panels.atoms";

export const useResetConsoles = (panelId?: string) => {
    const [panel, setPanel] = usePanelById(panelId)
    const [ _, setActivePanel] = useActiveConnectionPanelById(panelId)

    const onResetConsoles = () => {
        setPanel([]);
        setActivePanel(null)

    };


    return { onResetConsoles }
}