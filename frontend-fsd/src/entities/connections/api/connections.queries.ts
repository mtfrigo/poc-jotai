import { queryOptions } from "@tanstack/react-query";
import { ConnectionsService } from "./connections.service";
import { FetchUserConnectionsQueryParams } from "./params/user-connections.params";

export const ConnectionQueries = {
  all: () => ['connections'],
  
  fetchUserConnections: ({ user }: FetchUserConnectionsQueryParams) => 
    queryOptions({
      queryKey: [...ConnectionQueries.all(), user],
      queryFn:  () => ConnectionsService.fetchUserConnections({ user: user ?? "" }),
      enabled: !!user,
      initialData: []
    }),
    
};
