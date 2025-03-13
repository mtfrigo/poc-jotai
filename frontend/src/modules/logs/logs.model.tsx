import { useState } from "react"
import { LogsFilters } from "./schemas/logs-filters"
import { ListLogsServiceContract } from "./api/logs/list-logs.contracts"
import { useQuery } from "@tanstack/react-query"
import { Log } from "./schemas/logs"

const QUERY_KEYS = {
    LIST_LOGS: 'logs'
}

type Props = {
    service: {
        listLogs: ListLogsServiceContract
    }
}

export const useLogsModel = ({ service }: Props) => {
    const filters = useState<LogsFilters>({
        flavor: 'ORACLE'
    })

    const { data: listLogs } =  useQuery<Array<Log>>({
        queryKey: [QUERY_KEYS.LIST_LOGS],
        queryFn: () => service.listLogs.exec()
    })

    console.log({listLogs})

    return {
        logs: listLogs
    }
}