import { Connection } from "@/modules/console/schemas/connection";
import { cn } from "@/shared/libs/tailwind-merge/utils";
import { HTMLAttributes  } from "react";

const Console = ({ children, className, ...rest }: { children: React.ReactNode, className?: string } & HTMLAttributes<HTMLDivElement>) => {
  return <div data-testid="console-root" className={cn("flex flex-col flex-1 overflow-hidden border rounded-lg ", className)} {...rest}>{children}</div>;
};

const ConsoleToolbar = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  return <div className={cn("px-1 flex gap-1 h-8", className)}>{children}</div>;
};

const ConsoleFlavor = ({
  flavor,
  name,
}: {
  flavor: Connection["flavor"];
  name: Connection["name"];
}) => {
  return (
    <div
      className={cn("uppercase text-xs w-full text-center py-1 font-bold", {
        "text-green-500": flavor === "MONGO",
        "text-red-500": flavor === "ORACLE",
        "text-blue-500": flavor === "POSTGRES",
        "text-gray-500": flavor === "MYSQL",
      })}
    >
      {flavor} <span className="italic text-slate-500">({name})</span>
    </div>
  );
};

const ConsolePanel = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  return <div className={cn("flex-1 flex flex-col overflow-hidden border-b", className)}>{children}</div>;
};

const ConsoleBody = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  return <div className={cn("flex-1 p-1 flex", className)}>{children}</div>;
};

const ConsoleResult = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  return (
    <div className={cn("flex-1 overflow-auto flex-col p-1 flex", className)}>{children}</div>
  );
};

const ConsoleFooter = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  return <div className={cn("flex gap-1 p-1 text-sm border-t", className)}>{children}</div>;
};

Console.Toolbar = ConsoleToolbar;
Console.Body = ConsoleBody;
Console.Panel = ConsolePanel;
Console.Footer = ConsoleFooter;
Console.Result = ConsoleResult;
Console.Flavor = ConsoleFlavor;

export { Console };
