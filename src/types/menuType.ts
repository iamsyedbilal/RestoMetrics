export type MenuType = {
  name: string;
  description?: string;
  price: number;
  category?: string;
  image_url?: string;
  is_available?: boolean;
};

export interface MenuItem {
  id: string;
  restaurant_id: string;
  name: string;
  description: string | null;
  price: number;
  category: string;
  image_url: string | null;
  is_available: boolean;
  is_deleted: boolean;
  created_at: string;
}
