import { usePanelById, OracleExecuteBody, OracleExecuteBodySchema } from "@/entities/oracle";
import { useExecuteOracle } from "./execute.mutation";
import { useUpdateConsole } from "../../consoles";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import { OracleQueries } from "@/entities/oracle/api/oracle.queries";
import { usePanelStateById } from "@/entities/panels";
import { useEffect } from "react";

type Props = {
    consoleId: string;
}

export const useExecuteWithPolling = ({ consoleId }: Props) => {
  const { panel: oracleConsole} = usePanelById(consoleId)
  const [ isLoading, setIsLoading ] = usePanelStateById(consoleId)
  const { onUpdateConsole } = useUpdateConsole(consoleId)
  const { execute } = useExecuteOracle()

  const handleExecute = (params: OracleExecuteBody) => {
    const validatedParams = OracleExecuteBodySchema.parse(params);
    
    onUpdateConsole({
      statement: validatedParams.statement,
      executionId: undefined
    });

    setIsLoading(true)

    execute({
        resourceId: "",
        statement: validatedParams.statement
      }, {
      onSuccess: (data: any) => {
        onUpdateConsole({
          executionId: data.id as string,
        })
        toast.loading("Executando...", { id: data.id})
      }
    })
  }

   const { data: execution } = useQuery(OracleQueries.fetchByIdQuery({ executionId: oracleConsole?.executionId, enabled: false}))
  
    useEffect(() => {
      if (
        execution?.id === oracleConsole.executionId && 
        execution?.status === "SUCCESS" && isLoading
      ) {
        setIsLoading(false)
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [execution, oracleConsole]);

    return {
        handleExecute,
        execution
    }
}