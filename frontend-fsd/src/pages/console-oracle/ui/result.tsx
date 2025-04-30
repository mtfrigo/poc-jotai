import { OracleResultContent } from "@/entities/oracle/model/execution.schema";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/primitives/table";

type Props = {
  data?: OracleResultContent,
  isLoading: boolean,
  executionId?: string | null,
  loadingMessage?: string
}

export const Result = ({ data, isLoading, executionId,  loadingMessage = 'Carregando...' }: Props) => {

  return (
    <>
    {
      !executionId && !isLoading && (
        <div className="flex flex-1 justify-center items-center">
            No execution
        </div>
      )
    }
    {
      !executionId && isLoading && (
        <div className="flex flex-1 justify-center items-center">
            {loadingMessage}
        </div>
      )
    }
    {
      executionId && (
        <Table className="h-full ">
          <TableHeader>
            <TableRow>
              {data?.headers.map((header, i) => (
                <TableHead key={`${header}${i}`}>{header}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              isLoading && (
                <TableRow  className="h-10">
                    <TableCell colSpan={data?.headers.length} className="text-center h-24" >{loadingMessage}</TableCell>
                </TableRow>
              )
            }
            {!isLoading && data?.rows.map((row, i) => {
              return (
                <TableRow>
                  {data?.headers.map((header, j) => (
                    <TableCell key={`${i}-${j}-${header}`}>{row[header]}</TableCell>
                  ))}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      )
    }
    </>

  );
};
