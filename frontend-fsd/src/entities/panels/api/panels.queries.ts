import { queryOptions } from "@tanstack/react-query";
import { PanelsService } from "./panels.service";
import { FetchConnectionPanelsQueryParams } from "./params/connection-panels.params";

export const PanelsQueries = {
  all: () => ['panels'],
  
  fetchConnectionPanels: ({ user, connectionId  }: FetchConnectionPanelsQueryParams) => 
    queryOptions({
      queryKey: [...PanelsQueries.all(), user],
      queryFn:  () => PanelsService.fetchUserConnectionsPanels({ user: user ?? "", connectionId: connectionId ?? "" }),
      enabled: !!user && !!connectionId
    }),
    
};
