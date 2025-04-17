import { useConsoleById } from "@/entities/oracle";
import { OracleConsole } from "@/entities/oracle";

export const useUpdateConsole = (consoleId: string) => {
    const {console: conn, setConsole} = useConsoleById(consoleId)

    const onUpdateConsole = (data: Partial<OracleConsole>) => {


        setConsole({
            ...conn,
            ...data
        });
    };

    return { onUpdateConsole }
}