import { useActiveConnection } from "@/entities/connections";
import { ConnectionSidebar } from "@/widgets/connection-sidebar";
import { Outlet, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

export const ConsoleLayout = () => {

  const connection = useActiveConnection()
  const navigate = useNavigate({from: '/console'})

  useEffect(() => {
    if(connection) {
      switch(connection.flavor) {
        case "MONGO":
          navigate({ to: '/console'})
          break
        case "ORACLE":
        case "POSTGRES":
        case "MYSQL":
          navigate({ to: '/console/oracle'})
      }
      
    }
  }, [connection, navigate])

  return (
    <div className="flex-1 flex justify-center items-center">
      <div className="flex w-[1000px]  h-[600px] border rounded-md overflow-hidden">
        <div className="flex items-center justify-start border-r w-[300px]">
          <ConnectionSidebar />
        </div>
        <div className="flex w-full ">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
