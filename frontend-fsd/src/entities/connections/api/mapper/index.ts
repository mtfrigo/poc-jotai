import { Connection } from "../../model/connection.schema";
import { UserConnectionsDto } from "../dto/connections.dto";


export const mapUserConnections = (data: UserConnectionsDto): Connection[] => {
    return data.connections.map(({ flavor, id, name } ) => ({ flavor, id, name}))
}