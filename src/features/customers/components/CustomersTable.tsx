import { useCustomers } from "../hooks/useCustomers";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import { Card, CardContent } from "../../../components/ui/card";
import Loading from "../../../components/shared/Loading";
import TableItems from "./TableItems";

export default function CustomersTable() {
  const { data = [], isPending } = useCustomers();

  const customers = data ?? [];

  if (isPending) return <Loading />;

  console.log(data);

  return (
    <Card className="mt-5">
      <CardContent className="p-0 ">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead className="text-center">Orders</TableHead>
              <TableHead className="text-right">Spend</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customers.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="h-24 text-center text-muted-foreground">
                  No customers found
                </TableCell>
              </TableRow>
            ) : (
              customers.map((customer) => <TableItems customer={customer} />)
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
