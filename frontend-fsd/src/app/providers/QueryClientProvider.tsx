import { queryClient } from "@/shared/libs/react-query"
import { QueryClientProvider as Provider } from "@tanstack/react-query"
import { ReactNode } from "react"

type Props = {
    children: ReactNode
}

export const QueryClientProvider = ({ children }: Props) => {

    return (
        <Provider client={queryClient}>{children}</Provider>
    )

}