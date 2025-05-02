import { TeamNotFoundError } from "@/entities/teams/api/errors/TeamNotFoundError";
import {  useQueryErrorResetBoundary } from "@tanstack/react-query";
import { ErrorComponent, ErrorComponentProps, useRouter } from "@tanstack/react-router";
import { useEffect } from "react";

export const TeamErrorPage = ({ error }: ErrorComponentProps) => {

  const router = useRouter()
  
  if (error instanceof TeamNotFoundError) {
    return <div className="flex-1 flex justify-center items-center overflow-hidden border rounded-md">
      <div className="flex-1 grid grid-cols-2 gap-1 c w-full h-full mt-24 mx-8  overflow-hidden "><div className="col-span-2 p-4 rounded border text-center font-bold">{error.message}</div></div></div>
  }
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const queryErrorResetBoundary = useQueryErrorResetBoundary()

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    queryErrorResetBoundary.reset()
  }, [queryErrorResetBoundary])


  return (
    <div className="flex-1 flex justify-center items-center overflow-hidden">
      <div className="flex flex-1 w-full h-full mt-24 mx-8 border rounded-md overflow-hidden flex-col">
        <div className="text-2xl font-bold text-center w-full p-4">Erro ao buscar times</div>

        <div>
      <button
        onClick={() => {
          router.invalidate()
        }}
      >
        retry
      </button>
      <ErrorComponent error={error} />
    </div>
      </div>
    </div>
  );
};
