

import { CreateLogServiceContract } from "@/modules/logs/api/logs/create-log.contracts";
import { ListLogsServiceContract } from "@/modules/logs/api/logs/list-logs.contracts";
import { CreateLog } from "@/modules/logs/schemas/create-logs-schema";
import { Log } from "@/modules/logs/schemas/logs";
import { LogsFilters } from "@/modules/logs/schemas/logs-filters";
import { generateUUID } from "@/shared/libs/uuid";

export const logs: Log[] = []

export const successfulLogCreateServiceMock: CreateLogServiceContract = {
  exec: (data) => Promise.resolve({ 
    ...data,
    id: generateUUID()
   })
}

export class InMemoryCreateLogs implements CreateLogServiceContract {
    async exec(data: CreateLog): Promise<Log> {
        const newLog: Log = {
            executedAt: data.executedAt,
            flavor: data.flavor,
            id: generateUUID(), 
        }

        logs.push(newLog)

        return Promise.resolve(newLog);
    }
}

export class InMemoryListLogs implements ListLogsServiceContract {
    async exec(filters?: LogsFilters): Promise<Log[]> {
        console.log({filters})
        return Promise.resolve(logs);
    }
}