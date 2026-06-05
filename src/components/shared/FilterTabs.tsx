import { cn } from "../../lib/utils";

type FilterItem<T extends string> = {
  label: string;
  value: T;
};

type FilterTabsProps<T extends string> = {
  items: FilterItem<T>[];
  value: T;
  onChange: (value: T) => void;
};

export default function FilterTabs<T extends string>({
  items,
  value,
  onChange,
}: FilterTabsProps<T>) {
  return (
    <div className="w-full">
      <div className="flex items-center gap-2 overflow-x-auto rounded-2xl border bg-card p-1 shadow-sm">
        {items.map((item) => {
          const active = value === item.value;

          return (
            <button
              key={item.value}
              onClick={() => onChange(item.value)}
              className={cn(
                "relative whitespace-nowrap rounded-xl px-4 py-2 text-sm font-medium transition-all",
                "hover:text-foreground",
                active
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:bg-muted",
              )}>
              {item.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
