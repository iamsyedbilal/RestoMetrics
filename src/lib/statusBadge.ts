export function getStatusBadge(status: string) {
  switch (status) {
    case "delivered":
      return "bg-emerald-500/10 text-emerald-600 border-emerald-500/20";
    case "pending":
      return "bg-yellow-500/10 text-yellow-600 border-yellow-500/20";
    case "preparing":
      return "bg-blue-500/10 text-blue-600 border-blue-500/20";
    case "cancelled":
      return "bg-red-500/10 text-red-600 border-red-500/20";
    default:
      return "bg-muted text-muted-foreground";
  }
}
