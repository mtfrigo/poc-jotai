import { OracleQueries } from "@/entities/oracle/api/oracle.queries";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/primitives/table";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

export const Result = ({ executionId }: { executionId: string }) => {
  const { data: content, isFetched } = useQuery(
    OracleQueries.fetchContentQuery({ executionId })
  );

  
  const isLoading = useMemo(() => {
    if(isFetched) {
      return false;
    }

    if(!isFetched && executionId) return true;

  }, [executionId, isFetched])


  return (
    <Table className="h-full ">
      <TableHeader>
        <TableRow>
          {content?.headers.map((header, i) => (
            <TableHead key={`${header}${i}`}>{header}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {
          isLoading && (
            <TableRow  className="h-10">
                <TableCell colSpan={content?.headers.length} className="text-center" >Baixando resultado..</TableCell>
            </TableRow>
          )
        }
        {!isLoading && content?.rows.map((row, i) => {
          return (
            <TableRow>
              {content?.headers.map((header, j) => (
                <TableCell key={`${i}-${j}-${header}`}>{row[header]}</TableCell>
              ))}
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};
