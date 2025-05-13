import { OracleQueries, OracleService } from "@/entities/oracle/api"
import { OraclePanelDto } from "@/entities/oracle/api/dto/panel.dto"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AxiosError, AxiosResponse } from "axios"


export const useUpdatePanelMutation = () => {
    const queryClient = useQueryClient()

    const { mutate, isPending } = useMutation<
            OraclePanelDto, 
            AxiosError, 
            {
                user: string, 
                id: string, 
                statement?: string,
                executionId?: string,
                schema?: string,
            }
        >({
            mutationFn:  ({ schema, statement, executionId , user, id }) =>  OracleService.updatePanel({ schema, statement, executionId, id, user  }),
            onSuccess: (_, { id }) => {
                queryClient.invalidateQueries({
                    queryKey: OracleQueries.fetchPanelQuery({ id }).queryKey
                })
            }
        })

    return {
        mutate,
        isLoading: isPending
    }
}