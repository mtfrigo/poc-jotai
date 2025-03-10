import { Button } from "@/components/ui/button";
import { PlusCircleIcon, StopCircleIcon } from "lucide-react";
import { usePanelModel } from "./panel.model";
import { OraclePanel } from "./(oracle)/oracle-panel.view-model";
import { MongoPanel } from "./(mongo)/mongo-panel.view-model";
import {   useCallback } from "react";
import { cn } from "@/shared/libs/tailwind-merge/utils";

export const PanelView = ({
  panel,
  connection,
  handleAddTab,
  handleResetTabs,
  handleSelectTab,
}: ReturnType<typeof usePanelModel>) => {
  const getFlavorPanel = useCallback((id: string) => {
    if (!connection) return null;

    switch (connection.flavor) {
      case "MONGO":
        return <MongoPanel consoleId={id} />;
      case "ORACLE":
        return <OraclePanel consoleId={id} />;
      default:
        return <div>Unknown flavor</div>;
    }
  }, [connection]);

  return (
    <div className="flex flex-1 overflow-hidden">
      {!connection && <div className="flex items-center justify-center flex-1">No connection</div>}
      {!!connection && (
        <div className="flex flex-1 flex-col ">
          <div className="flex gap-1 w-full py-1 border-b px-1">
            <Button
              className=""
              onClick={handleAddTab}
              size="sm"
              variant="outline"
            >
              <PlusCircleIcon />
            </Button>
            {panel?.tabs.map((tab) => (
              <Button
                key={tab.id}
                size='sm'
                data-testid="panel-tab-trigger"
                className={cn({
                  'bg-green-500 hover:bg-green-200': tab.id === panel.activeTab
                })}
              variant="outline"
                onClick={() => handleSelectTab(tab.id)}
              >
                {tab.label}
              </Button>
            ))}
            <Button
              className=""
              onClick={handleResetTabs}
              size="sm"
              variant="outline"
            >
              <StopCircleIcon className="text-red-500" />
            </Button>
          </div>
          <div className="flex flex-1 overflow-hidden" >
            {!panel?.activeTab && <div className="flex flex-1 items-center justify-center">No Console selected</div>}
            {panel?.activeTab && getFlavorPanel(panel.activeTab)}
          </div>
        </div>
      )}
    </div>
  );
};
