import { OracleExecuteBody, OracleExecuteBodySchema } from "@/entities/oracle";
import { useExecuteOracle } from "./execute.mutation";
import { useQuery } from "@tanstack/react-query";
import { OracleQueries } from "@/entities/oracle/api/oracle.queries";
import { usePanelStateById } from "@/entities/panels";
import { useEffect } from "react";
import { useUpdatePanel } from "../../consoles/update-panel/update-panel.feature";

type Props = {
    consoleId: string;
}

export const useExecuteWithPolling = ({ consoleId }: Props) => {
    const { data: oraclePanel } = useQuery(OracleQueries.fetchPanelQuery({ id: consoleId }))
  
  const [ panelState, setPanelState ] = usePanelStateById(consoleId)

  const { handleUpdatePanel } = useUpdatePanel()
  
  const { execute } = useExecuteOracle()

  const handleExecute = (params: OracleExecuteBody) => {
    const validatedParams = OracleExecuteBodySchema.parse(params);
    
    setPanelState({
      isLoading: true,
      loadingMessage: 'Executando...'
    })
    
    handleUpdatePanel(consoleId, {
      ...oraclePanel,
      statement: validatedParams.statement,
      executionId: undefined
    });


    execute({
        resourceId: "",
        statement: validatedParams.statement
      }, {
      onSuccess: (data: any) => {
        handleUpdatePanel(consoleId, {
          ...oraclePanel,
          executionId: data.id as string,
        })
        setPanelState({
          isLoading: true,
          loadingMessage: 'Iniciando polling...'
        })
      }
    })
  }

  const { data: execution, } = useQuery(OracleQueries.fetchByIdQuery({ id: oraclePanel?.executionId}))
  
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
    }, [execution, content, isContentFetched, oraclePanel]);

    return {
        handleExecute,
        data: content,
        isLoading: panelState.isLoading,
        execution,
        loadingMessage: panelState.loadingMessage,
    }
}