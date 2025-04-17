import { store  } from "@/entities/connections";
import { useAddConnection } from "@/features/connections/add-connection";
import { useResetConnections } from "@/features/connections/reset-connections";
import { cn } from "@/shared/libs/tailwind-merge/utils";
import { Button } from "@/shared/ui/primitives/button";
import { Input } from "@/shared/ui/primitives/input";
import { useAtom, useAtomValue } from "jotai";
import { PlusCircleIcon, StopCircleIcon } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";


export const ConnectionSidebar = () => {
  const { handleAddConnection } = useAddConnection()
  const { handleResetConnections } = useResetConnections()
  const [activeConnection, onSelectConnection] = useAtom(store.activeConnection)

  const connections = useAtomValue(store.connections)
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
        {connections.map((connection) => {
          return (
            <Button
              variant="outline"
              className={cn("w-full", {
                "bg-green-500 hover:bg-green-400":
                  activeConnection?.id === connection.id,
              })}
              onDoubleClick={() => {
                onSelectConnection(connection)
                navigate({to: `/console/${connection?.flavor.toLowerCase()}`})
              }}
              key={connection.id}
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
};
