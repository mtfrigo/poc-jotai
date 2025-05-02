import { OracleService } from "@/entities/oracle/api/oracle.service"
import { useMutation } from "@tanstack/react-query"
import { AxiosError, AxiosResponse } from "axios"


export const useExecuteOracle = () => {
    const { mutate, isPending } = useMutation<AxiosResponse, AxiosError, {resourceId: string, statement: string }>({
        mutationFn: ({ resourceId, statement }) => OracleService.execute({ resourceId, statement })
    })

    return {
       execute: mutate,
       isLoading: isPending
    }
}