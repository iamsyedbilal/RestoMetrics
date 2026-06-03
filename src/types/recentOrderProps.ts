export interface RecentOrder {
  id: string;
  total_amount: number;
  status: string;
  order_type: string;
  created_at: string;
  customers: {
    name: string;
  } | null;
}
