import { AxiosHttpClientAdapter } from "@/infra/http/axios-client.adapter"
import { useLogsModel } from "./logs.model"
import { LogsView } from "./logs.view"
import { InMemoryListLogs } from "@/test/mock/api/logs/logs.service"


export const Logs = () => {
    const httpClient = new AxiosHttpClientAdapter()

    const listLogsService = new InMemoryListLogs();

    const model = useLogsModel({
        service: {
            listLogs: listLogsService
        }
    })
    return <LogsView {...model} />
}