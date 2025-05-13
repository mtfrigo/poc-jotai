import { useActiveConnection } from "@/entities/connections";

import { Button } from "@/shared/ui/primitives/button";
import { PlusCircleIcon, StopCircleIcon } from "lucide-react";
import { cn } from "@/shared/libs/tailwind-merge/utils";
import { OraclePanel } from "./console";
import {  useActiveConnectionPanelById,  PanelsQueries} from "@/entities/panels";
import { useSelectPanelTab, useResetConsoles} from "@/features/oracle";
import { useQuery } from "@tanstack/react-query";
import { CONFIG } from "@/shared/config/auth";
import { useAddPanel } from "@/features/oracle/consoles/add-panel/add-panel.feature";

export const OracleConsolePage = () => {
    const connection = useActiveConnection()

    const { data: panels } = useQuery(PanelsQueries.fetchConnectionPanels({ connectionId:connection?.id, user: CONFIG.username}))

    const [activePanel] = useActiveConnectionPanelById(connection?.id)

    const { handleSelectTab } = useSelectPanelTab(connection?.id)
    const { handleAddPanel } = useAddPanel()
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
              onClick={() => handleAddPanel({ id: connection?.id, name: connection?.name})}
              size="sm"
              variant="outline"
            >
              <PlusCircleIcon />
            </Button>
            {panels?.map((tab) => (
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