import { useOrdersStore } from "../../../store/orderStore";
import SearchInput from "../../../components/shared/SearchInput";

export default function OrderSearch() {
  const { search, setSearch } = useOrdersStore();
  return (
    <SearchInput
      value={search}
      onChange={setSearch}
      placeholder="Search orders..."
    />
  );
}
