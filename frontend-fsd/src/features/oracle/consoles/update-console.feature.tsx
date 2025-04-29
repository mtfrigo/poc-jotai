import { usePanelById } from "@/entities/oracle";
import { OraclePanel } from "@/entities/oracle";

export const useUpdateConsole = (consoleId: string) => {
    const {panel: conn, setPanel} = usePanelById(consoleId)

    const onUpdateConsole = (data: Partial<OraclePanel>) => {


        setPanel({
            ...conn,
            ...data
        });
    };

    return { onUpdateConsole }
}