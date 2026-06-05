export interface OrderCustomer {
  name: string;
}

export interface Order {
  id: string;
  total_amount: number;
  status: string;
  order_type: string;
  created_at: string;
  notes: string | null;
  customers: OrderCustomer | null;
}
