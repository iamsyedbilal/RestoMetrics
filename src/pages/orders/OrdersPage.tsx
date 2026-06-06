import Cards from "../../features/orders/components/Cards";
import OrderDetailsModal from "../../components/shared/Modal";
import OrderSearch from "../../features/orders/components/OrderSearch";
import OrdersFilters from "../../features/orders/components/OrdersFilters";
import OrdersTable from "../../features/orders/components/OrdersTable";

export default function OrdersPage() {
  return (
    <div>
      <Cards />
      <div className="py-4 flex items-center flex-col md:flex-row gap-4 md:gap-2 ">
        <OrdersFilters />
        <OrderSearch />
      </div>
      <OrdersTable />
      <OrderDetailsModal />
    </div>
  );
}
