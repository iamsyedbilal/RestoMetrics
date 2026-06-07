import { useRestaurant } from "../features/restaurants/hooks/useRestaurant";

const currencyRates = {
  PKR: 1,
  USD: 0.0036, // 1 PKR = 0.0036 USD
  EUR: 0.0032, // 1 PKR = 0.0032 EUR
  GBP: 0.0027, // 1 PKR = 0.0027 GBP
  AED: 0.013, // 1 PKR = 0.013 AED
} as const;

export function useFormatCurrency() {
  const { restaurant } = useRestaurant();

  const currency = (restaurant?.currency ??
    "PKR") as keyof typeof currencyRates;

  return (amountInPKR: number) => {
    const rate = currencyRates[currency] ?? 1;

    const convertedAmount = amountInPKR * rate;

    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
    }).format(convertedAmount);
  };
}
