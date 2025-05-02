import { usePanelById, OracleExecuteBody, OracleExecuteBodySchema } from "@/entities/oracle";
import { useExecuteOracle } from "./execute.mutation";
import { useUpdateConsole } from "../../consoles";
import { useQuery } from "@tanstack/react-query";
import { OracleQueries } from "@/entities/oracle/api/oracle.queries";
import { usePanelStateById } from "@/entities/panels";
import { useEffect } from "react";

type Props = {
    consoleId: string;
}

export const useExecuteWithPolling = ({ consoleId }: Props) => {
  const { panel: oracleConsole} = usePanelById(consoleId)
  const [ panelState, setPanelState ] = usePanelStateById(consoleId)
  const { onUpdateConsole } = useUpdateConsole(consoleId)
  const { execute } = useExecuteOracle()

  const handleExecute = (params: OracleExecuteBody) => {
    const validatedParams = OracleExecuteBodySchema.parse(params);
    
    
    setPanelState({
      isLoading: true,
      loadingMessage: 'Executando...'
    })
    
    onUpdateConsole({
      statement: validatedParams.statement,
      executionId: undefined
    });


    execute({
        resourceId: "",
        statement: validatedParams.statement
      }, {
      onSuccess: (data: any) => {
        onUpdateConsole({
          executionId: data.id as string,
        })
        setPanelState({
          isLoading: true,
          loadingMessage: 'Iniciando polling...'
        })
      }
    })
  }

  const { data: execution, } = useQuery(OracleQueries.fetchByIdQuery({ id: oracleConsole?.executionId}))
  
  const { data: content, isFetched: isContentFetched } = useQuery(
    OracleQueries.fetchContentQuery({ 
      id: execution?.id, 
      enabled: !!execution?.id && execution?.status === "SUCCESS" 
    })
  );


    useEffect(() => {
      if(execution?.status === 'PENDING') {
        setPanelState({
          isLoading: true,
          loadingMessage: 'Polling...'
        })
      } else if(execution?.status === "SUCCESS" && !isContentFetched)  {
        setPanelState({
          isLoading: true,
          loadingMessage: 'Baixando resultado...'
        })
      } else if(execution?.status === "SUCCESS" && isContentFetched) {
        setPanelState({
          isLoading: false,
          loadingMessage: ''
        })
      } else if(execution?.status === "ERROR") {
        setPanelState({
          isLoading: false,
          loadingMessage: ''
        })
      }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [execution, content, isContentFetched, oracleConsole]);

    return {
        handleExecute,
        data: content,
        isLoading: panelState.isLoading,
        execution,
        loadingMessage: panelState.loadingMessage,
    }
}