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

export const Result = ({ executionId }: { executionId: string }) => {
  const { data: content } = useQuery(
    OracleQueries.fetchContentQuery({ executionId })
  );

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
        {content?.rows.map((row, i) => {
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
