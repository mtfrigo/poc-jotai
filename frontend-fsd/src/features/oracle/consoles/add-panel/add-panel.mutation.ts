import { OracleService } from "@/entities/oracle/api"
import { PanelsQueries } from "@/entities/panels"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AxiosError, AxiosResponse } from "axios"


export const useAddPanelMutation = () => {
    const queryClient = useQueryClient()

    const { mutate, isPending } = useMutation<
            AxiosResponse, 
            AxiosError, 
            {
                user: string, 
                id: string, 
                name: string
            }
        >({
            mutationFn:  ({ name, user, id }) =>  OracleService.addPanel({ name, id, user  }),
            onSuccess: () => {
                queryClient.invalidateQueries({
                    queryKey: PanelsQueries.all()
                })
            }
        })

    return {
        mutate,
       isLoading: isPending
    }
}