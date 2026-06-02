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
