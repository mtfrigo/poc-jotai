import { ConnectionQueries, store  } from "@/entities/connections";
import { useAddConnection } from "@/features/connections/add-connection";
import { useResetConnections } from "@/features/connections/reset-connections";
import { cn } from "@/shared/libs/tailwind-merge/utils";
import { Button } from "@/shared/ui/primitives/button";
import { Input } from "@/shared/ui/primitives/input";
import { useAtom } from "jotai";
import { PlusCircleIcon, StopCircleIcon } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { compose, withSuspense } from "@/shared/libs/react";
import { withErrorBoundary } from "react-error-boundary";
import { useQuery } from "@tanstack/react-query";
import { CONFIG } from "@/shared/config/auth";



const enhance = compose(
  (component) =>
    withErrorBoundary(component, {
      FallbackComponent: () => <div className="flex flex-1 items-center justify-center">Erro</div>,
    }),
  (component) => withSuspense(component, { FallbackComponent: ()  => <div>loading</div> }) 
);


export const ConnectionSidebar = enhance(() => {
  const { handleAddConnection } = useAddConnection()
  const { handleResetConnections } = useResetConnections()
  const [activeConnection, onSelectConnection] = useAtom(store.activeConnection)

  const { data: connections } = useQuery(ConnectionQueries.fetchUserConnections({ user: CONFIG.username}))

  console.log({connections})

  const navigate = useNavigate({ from: '/console' })

  return (
    <div className="flex flex-1 h-full flex-col gap-1 ">
      <div className="w-full h-10 flex gap-1 p-1 items-center justify-between">
        <Button size="sm" variant="ghost" onClick={handleAddConnection} data-testid='new-connection-button'>
          New <PlusCircleIcon className="text-green-500" />
        </Button>
        <Button size="sm" variant="ghost" onClick={handleResetConnections} data-testid='reset-connection-button'>
          Reset <StopCircleIcon className="text-red-500" />
        </Button>
      </div>
      <hr className="" />

      <div className="p-1">
        <Input placeholder="Filter..." />
      </div>
      <hr className="" />
      <div className="h-full flex-1 p-1 flex-col gap-1 flex" data-testid='connection-list'>
        {connections.map((connection, i) => {
          return (
            <Button
              variant="outline"
              className={cn("w-full", {
                "bg-green-500 hover:bg-green-400":
                  activeConnection?.id === connection.id,
              })}
              onDoubleClick={() => {
                console.log("selecting database")
                console.log({connection})
                onSelectConnection(connection)
                navigate({to: `/console/${connection?.flavor.toLowerCase()}`})
              }}
              key={`${connection.id}#${i}`}
            >
              {connection.flavor}: {connection.name}
            </Button>
          );
        })}
        {connections.length === 0 && (
          <div className="italic items-center justify-center w-full text-center text-sm">
            No connections available
          </div>
        )}
      </div>
    </div>
  );
});
