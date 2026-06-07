export function formatCurrency(amount: number, currency: string = "PKR") {
  return `${currency} ${amount.toLocaleString()}`;
}
