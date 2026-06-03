export function formatCurrency(value: number) {
  return `PKR ${value.toLocaleString("en-PK", {
    maximumFractionDigits: 0,
  })}`;
}
