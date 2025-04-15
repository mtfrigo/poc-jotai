import { Button } from "@/shared/ui/primitives/button";
import { Input } from "@/shared/ui/primitives/input";
import { PlusCircleIcon, StopCircleIcon } from "lucide-react";

export const ConnectionSidebar = () => {

  const handleNewConnection = () => {}
  const handleResetConnections = () => {}

  const connections = []


  return (
    <div className="flex flex-1 h-full flex-col gap-1 ">
      <div className="w-full h-10 flex gap-1 p-1 items-center justify-between">
        <Button size="sm" variant="ghost" onClick={handleNewConnection} data-testid='new-connection-button'>
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
        {/* {connections.map((connection) => {
          return (
            <Button
              variant="outline"
              className={cn("w-full", {
                "bg-green-500 hover:bg-green-400":
                  activeConnection?.id === connection.id,
              })}
              onDoubleClick={() => handleDbClickConnection(connection)}
              key={connection.id}
            >
              {connection.flavor}: {connection.name}
            </Button>
          );
        })} */}
        {connections.length === 0 && (
          <div className="italic items-center justify-center w-full text-center text-sm">
            No connections available
          </div>
        )}
      </div>
    </div>
  );
};
