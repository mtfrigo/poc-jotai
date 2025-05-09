import { ConnectionQueries, ConnectionsService } from "@/entities/connections"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AxiosError, AxiosResponse } from "axios"


export const useAddConnectionMutation = () => {
    const queryClient = useQueryClient()

    const { mutate, isPending } = useMutation<
            AxiosResponse, 
            AxiosError, 
            {user: string , flavor: string , id: string, name: string, favorite: boolean }
        >({
            mutationFn:  ({ name, flavor, favorite, user, id }) =>  ConnectionsService.addUserConnection({ name, id, flavor, user, favorite }),
            onSuccess: () => {
                queryClient.invalidateQueries({
                    queryKey: ConnectionQueries.all()
                })
            }
        })

    return {
        mutate,
       isLoading: isPending
    }
}