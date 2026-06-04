import { Search } from "lucide-react";
import { useOrdersStore } from "../../../store/orderStore";

export default function OrderSearch() {
  const { search, setSearch } = useOrdersStore();
  return (
    <div className="relative w-full ">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search..."
        className="
          w-full rounded-2xl border border-border
          bg-card pl-10 pr-4 py-2.5
          text-sm text-foreground
          shadow-sm outline-none
          transition-all
          placeholder:text-muted-foreground
          focus:border-primary/40
          focus:ring-2 focus:ring-primary/10
        "
      />
    </div>
  );
}
