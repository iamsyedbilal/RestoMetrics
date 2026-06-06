export default function EmptyState({ text }: { text: string }) {
  return (
    <div className="flex h-40 items-center justify-center rounded-xl border bg-card">
      <p className="text-sm text-muted-foreground">No {text} found</p>
    </div>
  );
}
