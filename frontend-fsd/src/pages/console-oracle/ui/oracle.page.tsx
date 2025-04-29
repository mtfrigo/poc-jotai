import { useActiveConnection } from "@/entities/connections";

import { Button } from "@/shared/ui/primitives/button";
import { PlusCircleIcon, StopCircleIcon } from "lucide-react";
import { cn } from "@/shared/libs/tailwind-merge/utils";
import { OraclePanel } from "./console";
import { usePanelById, useActiveConnectionPanelById} from "@/entities/panels";
import { useSelectPanelTab, useNewConsole, useResetConsoles} from "@/features/oracle";

export const OracleConsolePage = () => {
    const connection = useActiveConnection()

    const [panel] = usePanelById(connection?.id)
    const [activePanel] = useActiveConnectionPanelById(connection?.id)

    const { handleSelectTab } = useSelectPanelTab(connection?.id)
    const { handleAddConsole } = useNewConsole(connection?.id)
    const { onResetConsoles } =  useResetConsoles(connection?.id)

    return (
        <div className="flex flex-1 overflow-hidden">
      {!connection && (
        <div className="flex items-center justify-center flex-1">
          No connection
        </div>
      )}
      {!!connection && (
        <div className="flex flex-1 flex-col ">
          <div className="flex gap-1 w-full py-1 border-b px-1">
            <Button
              className=""
              onClick={() => handleAddConsole(connection?.name)}
              size="sm"
              variant="outline"
            >
              <PlusCircleIcon />
            </Button>
            {panel?.map((tab) => (
              <Button
                key={tab.id}
                size="sm"
                data-testid="panel-tab-trigger"
                className={cn({
                  "bg-green-500 hover:bg-green-200": tab.id === activePanel,
                })}
                variant="outline"
                onClick={() => handleSelectTab(tab.id)}
              >
                {tab.label}
              </Button>
            ))}
            <Button
              className=""
              onClick={onResetConsoles}
              size="sm"
              variant="outline"
            >
              <StopCircleIcon className="text-red-500" />
            </Button>
          </div>
          <div className="flex flex-1 overflow-hidden">
            {!activePanel && (
              <div className="flex flex-1 items-center justify-center">
                No Console selected
              </div>
            )}
            {activePanel && <OraclePanel panelId={activePanel} />}
          </div>
        </div>
      )}
    </div>
    )
}