import SearchInput from "../../../components/shared/SearchInput";
import { useCustomersStore } from "../../../store/customerStore";

export default function CustomerSearch() {
  const { search, setSearch } = useCustomersStore();

  return (
    <SearchInput
      value={search}
      onChange={setSearch}
      placeholder="Search customers..."
    />
  );
}
