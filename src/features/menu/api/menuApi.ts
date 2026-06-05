import { supabase } from "../../../services/supabase/client";
import type { MenuType } from "../../../types/menuType";

export async function getAllMenus(restaurantId: string) {
  const { data: menus, error } = await supabase
    .from("menu_items")
    .select("*")
    .eq("restaurant_id", restaurantId)
    .eq("is_deleted", false)
    .order("created_at", { ascending: false });

  if (error) throw error;

  return menus;
}

export async function uploadMenuImage(file: File, restaurantId: string) {
  const fileExt = file.name.split(".").pop();
  const fileName = `${restaurantId}/${Date.now()}.${fileExt}`;

  const { error: uploadError } = await supabase.storage
    .from("menu-images")
    .upload(fileName, file);

  if (uploadError) throw uploadError;

  const { data } = supabase.storage.from("menu-images").getPublicUrl(fileName);

  return data.publicUrl;
}

export async function createMenu(
  restaurantId: string,
  menuData: MenuType,
  imageFile?: File,
) {
  let image_url = null;

  if (imageFile) {
    image_url = await uploadMenuImage(imageFile, restaurantId);
  }

  const { data, error } = await supabase
    .from("menu_items")
    .insert([
      {
        restaurant_id: restaurantId,
        ...menuData,
        image_url,
      },
    ])
    .select()
    .single();

  if (error) throw error;

  return data;
}

export async function deleteMenuItem(menuId: string) {
  const { error } = await supabase
    .from("menu_items")
    .update({ is_deleted: true })
    .eq("id", menuId);

  if (error) {
    console.log(error);
    throw error;
  }

  return true;
}
