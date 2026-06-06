import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import type { ReactNode } from "react";

type Column = {
  label: string;
  align?: "left" | "right" | "center";
};

type DataTableProps = {
  columns: Column[];
  children: ReactNode;
};

const alignClass = {
  left: "text-left",
  right: "text-right",
  center: "text-center",
};

export default function DataTable({ columns, children }: DataTableProps) {
  return (
    <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/40 hover:bg-muted/40">
            {columns.map((col, i) => (
              <TableHead
                key={i}
                className={`text-xs ${alignClass[col.align ?? "left"]}`}>
                {col.label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>{children}</TableBody>
      </Table>
    </div>
  );
}
