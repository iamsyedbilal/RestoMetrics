import { supabase } from "../../../services/supabase/client";

export async function getAllTheCustomers(restaurantId: string, search: string) {
  let query = supabase
    .from("customers")
    .select(
      `
    id, name, email, phone,
    orders (
      id, total_amount, status,
      order_type, created_at
    )
  `,
    )
    .eq("restaurant_id", restaurantId);

  if (search.trim()) {
    query = query.or(
      `name.ilike.%${search}%,email.ilike.%${search}%,phone.ilike.%${search}%`,
    );
  }

  const { data: customers, error } = await query;

  if (error) {
    console.error("Error fetching customers:", error);
    return null;
  }

  return customers;
}
