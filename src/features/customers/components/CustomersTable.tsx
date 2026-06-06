import { useCustomers } from "../hooks/useCustomers";
import Loading from "../../../components/shared/Loading";
import DataTable from "../../../components/shared/DataTable";
import { TableCell, TableRow } from "../../../components/ui/table";

import TableItems from "./TableItems";

export default function CustomersTable() {
  const { data = [], isPending } = useCustomers();

  const customers = data ?? [];

  const columns = [
    { label: "Customer" },
    { label: "Email" },
    { label: "Phone" },
    { label: "Orders", align: "center" as const },
    { label: "Spend", align: "right" as const },
  ];

  if (isPending) return <Loading />;

  return (
    <div className="mt-5">
      <DataTable columns={columns}>
        {customers.length === 0 ? (
          <TableRow>
            <TableCell
              colSpan={5}
              className="h-24 text-center text-muted-foreground">
              No customers found
            </TableCell>
          </TableRow>
        ) : (
          customers.map((customer) => (
            <TableItems key={customer.id} customer={customer} />
          ))
        )}
      </DataTable>
    </div>
  );
}
