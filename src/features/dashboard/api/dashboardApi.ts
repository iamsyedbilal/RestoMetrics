import { supabase } from "../../../services/supabase/client";

interface OrderItemRow {
  quantity: number;
  subtotal: number;
  menu_items: {
    id: string;
    name: string;
    category: string;
  } | null;
  orders: {
    restaurant_id: string;
    status: string;
  };
}

// Get Total Revenue - orders - avg order value - customers
export async function getDashboardMetrics(restaurantId: string) {
  const { data: orders, error } = await supabase
    .from("orders")
    .select("status,total_amount")
    .eq("restaurant_id", restaurantId)
    .eq("status", "delivered");

  if (error) {
    console.error("Error fetching orders:", error);
    return null;
  }

  const totalRevenue = orders.reduce(
    (sum, order) => sum + order.total_amount,
    0,
  );
  const totalOrders = orders.length;
  const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

  // Get total customers
  const { count, error: customerError } = await supabase
    .from("customers")
    .select("*", { count: "exact", head: true })
    .eq("restaurant_id", restaurantId);

  if (customerError) {
    console.error("Error fetching customers:", customerError);
    return null;
  }

  return {
    totalRevenue,
    totalOrders,
    avgOrderValue,
    totalCustomers: count ?? 0,
  };
}

// Get Revenue by Day
export async function getRevenueByDay(restaurantId: string, days: number) {
  const { data, error } = await supabase
    .from("orders")
    .select("created_at,total_amount")
    .eq("restaurant_id", restaurantId)
    .eq("status", "delivered")
    .gte(
      "created_at",
      new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString(),
    )
    .order("created_at", { ascending: true });

  if (error) {
    console.error("Error fetching revenue by day:", error);
    return [];
  }

  const revenueByDay: Record<string, number> = {};
  data.forEach((order) => {
    const date = new Date(order.created_at).toLocaleDateString();
    revenueByDay[date] = (revenueByDay[date] || 0) + order.total_amount;
  });

  return Object.entries(revenueByDay).map(([date, revenue]) => ({
    date,
    revenue,
  }));
}

// Get Order status distribution - order_type (for donut chart) Dine-in,delivery,takeaway

export async function getOrderStatusDistribution(restaurantId: string) {
  const { data, error } = await supabase
    .from("orders")
    .select("order_type")
    .eq("restaurant_id", restaurantId)
    .eq("status", "delivered");

  if (error) {
    console.error("Error fetching order type distribution:", error);
    return [];
  }

  const counts = {
    delivery: 0,
    "dine-in": 0,
    takeaway: 0,
  };

  data.forEach((order) => {
    if (order.order_type === "delivery") {
      counts.delivery++;
    } else if (order.order_type === "dine-in") {
      counts["dine-in"]++;
    } else if (order.order_type === "takeaway") {
      counts.takeaway++;
    }
  });

  return [
    {
      name: "Delivery",
      value: counts.delivery,
      fill: "var(--chart-1)",
    },
    {
      name: "Dine In",
      value: counts["dine-in"],
      fill: "var(--chart-2)",
    },
    {
      name: "Takeaway",
      value: counts.takeaway,
      fill: "var(--chart-4)",
    },
  ];
}

// Get Top selling items
export async function getTopSellingItems(restaurantId: string) {
  const { data, error } = await supabase
    .from("order_items")
    .select(
      `
      quantity,
      subtotal,
      menu_items (
        id,
        name,
        category
      ),
      orders!inner (
        restaurant_id,
        status
      )
    `,
    )
    .eq("orders.restaurant_id", restaurantId)
    .eq("orders.status", "delivered");

  if (error) throw error;

  // Group by menu item
  const grouped: Record<
    string,
    {
      name: string;
      category: string;
      totalOrders: number;
      totalRevenue: number;
    }
  > = {};

  (data as unknown as OrderItemRow[]).forEach((item) => {
    const menuItem = item.menu_items;
    if (!menuItem) return;

    if (!grouped[menuItem.id]) {
      grouped[menuItem.id] = {
        name: menuItem.name,
        category: menuItem.category,
        totalOrders: 0,
        totalRevenue: 0,
      };
    }

    grouped[menuItem.id].totalOrders += item.quantity;
    grouped[menuItem.id].totalRevenue += item.subtotal;
  });

  // Sort by totalOrders, return top 5
  return Object.values(grouped)
    .sort((a, b) => b.totalOrders - a.totalOrders)
    .slice(0, 5);
}

export async function getRecentOrders(restaurantId: string) {
  const { data, error } = await supabase
    .from("orders")
    .select(
      `
      id,
      total_amount,
      status,
      order_type,
      created_at,
      customers (
        name
      )
    `,
    )
    .eq("restaurant_id", restaurantId)
    .order("created_at", { ascending: false })
    .limit(5);

  if (error) throw error;
  return data;
}
