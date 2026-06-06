import { supabase } from "../../../services/supabase/client";

export async function getRestaurant(userId: string) {
  const { data, error } = await supabase
    .from("restaurants")
    .select("*")
    .eq("user_id", userId)
    .single();

  if (error && error.code !== "PGRST116") throw error;
  // PGRST116 = no rows found — not a real error, just means first time user

  return data;
}

export async function createRestaurant(userId: string, name: string) {
  const { data, error } = await supabase
    .from("restaurants")
    .insert({ user_id: userId, name })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function uploadRestaurantLogo(restaurantId: string, file: File) {
  const extension = file.name.split(".").pop();

  const fileName = `${restaurantId}-${Date.now()}.${extension}`;

  const { error } = await supabase.storage
    .from("restaurant-logos")
    .upload(fileName, file, {
      upsert: true,
    });

  if (error) throw error;

  const { data } = supabase.storage
    .from("restaurant-logos")
    .getPublicUrl(fileName);

  return data.publicUrl;
}

export async function updateRestaurant(
  restaurantId: string,
  updates: {
    name?: string;
    logo_url?: string;
    currency?: string;
    tax_rate?: number;
  },
) {
  const { data, error } = await supabase
    .from("restaurants")
    .update(updates)
    .eq("id", restaurantId)
    .select()
    .single();

  if (error) throw error;

  return data;
}
