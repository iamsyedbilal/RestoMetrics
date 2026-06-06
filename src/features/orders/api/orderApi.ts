import { supabase } from "../../../services/supabase/client";
import type { OrderStatus } from "../../../store/orderStore";

// Get total orders count
// Pending orders count
// Preparing orders count
// Delivered orders count
// cancelled orders count
export async function getOrderMetrics(restarurantId: string) {
  const { data: orders, error } = await supabase
    .from("orders")
    .select("status")
    .eq("restaurant_id", restarurantId)
    .in("status", ["pending", "preparing", "delivered", "cancelled"])
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching orders:", error);
    return null;
  }

  const totalOrders = orders.length;
  const pendingOrders = orders.filter(
    (order: { status: string }) => order.status === "pending",
  ).length;
  const preparingOrders = orders.filter(
    (order: { status: string }) => order.status === "preparing",
  ).length;
  const deliveredOrders = orders.filter(
    (order: { status: string }) => order.status === "delivered",
  ).length;
  const cancelledOrders = orders.filter(
    (order: { status: string }) => order.status === "cancelled",
  ).length;

  return {
    totalOrders,
    pendingOrders,
    preparingOrders,
    deliveredOrders,
    cancelledOrders,
  };
}

// Get All Orders
export async function getOrders(
  restaurantId: string,
  status: OrderStatus,
  search: string,
  page: number,
  limit: number,
) {
  let query = supabase
    .from("orders")
    .select(
      `
      id,
      status,
      order_type,
      total_amount,
      created_at,
      notes,
      *,
  customers!inner (
    name
  )
    `,
      { count: "exact" },
    )
    .eq("restaurant_id", restaurantId)
    .order("created_at", { ascending: false });

  if (status !== "all") {
    query = query.eq("status", status);
  }

  if (search.trim()) {
    query = query.ilike("customers.name", `%${search}%`);
  }

  const from = (page - 1) * limit;
  const to = from + limit - 1;

  query = query.range(from, to);

  const { data, error, count } = await query;
  if (error) throw error;
  return {
    data,
    total: count ?? 0,
  };
}

// Get Single Order
export async function getSingleOrder(orderId: string) {
  const { data, error } = await supabase
    .from("orders")
    .select(
      `
      *,
      customers(*),
      order_items(
        *,
        menu_items(*)
      )
    `,
    )
    .eq("id", orderId)
    .single();

  if (error) throw error;

  return data;
}
