import { connections }  from './model/connection.atom'
import { activeConnectionAtom}  from './model/active-connection.atom'
export * as schemas from './model/connection.schema'
export { ConnectionQueries, ConnectionsService } from './api'

export const store = {
    connections,
    activeConnection: activeConnectionAtom
}

export { useActiveConnection} from './model/active-connection.atom'