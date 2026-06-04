import { useOrdersStore } from "../../../store/orderStore";

export default function OrdersPagination({ total }: { total: number }) {
  const { page, setPage, limit } = useOrdersStore();

  const totalPages = Math.ceil(total / limit);

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between p-4">
      <p className="text-sm text-muted-foreground">
        Showing page {page} of {totalPages}
      </p>

      <div className="flex gap-2">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className="rounded-lg border px-3 py-1 text-sm disabled:opacity-50">
          Prev
        </button>

        {Array.from({ length: 5 }).map((_, i) => {
          const p = i + 1;

          return (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`rounded-lg px-3 py-1 text-sm ${
                page === p
                  ? "bg-primary text-primary-foreground"
                  : "border hover:bg-muted"
              }`}>
              {p}
            </button>
          );
        })}

        <button
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
          className="rounded-lg border px-3 py-1 text-sm disabled:opacity-50">
          Next
        </button>
      </div>
    </div>
  );
}
