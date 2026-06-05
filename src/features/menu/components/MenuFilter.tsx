import FilterTabs from "../../../components/shared/FilterTabs";
import { useMenuStore } from "../../../store/menuStore";
import { useMenuCategories } from "../hooks/useMenu";

export default function MenuFilter() {
  const { category, setCategory } = useMenuStore();
  const { data: categories = [] } = useMenuCategories();

  const filters = [
    { label: "All", value: "all" },
    ...categories.map((cat) => ({
      label: cat,
      value: cat,
    })),
  ];

  return <FilterTabs items={filters} value={category} onChange={setCategory} />;
}
