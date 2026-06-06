import CustomerSearch from "../../features/customers/components/CustomerSearch";
import CustomersTable from "../../features/customers/components/CustomersTable";

export default function CustomersPage() {
  return (
    <div>
      <CustomerSearch />
      <CustomersTable />
    </div>
  );
}
