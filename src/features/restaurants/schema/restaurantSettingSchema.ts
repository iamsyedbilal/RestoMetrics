import { z } from "zod";

export const restaurantSettingsSchema = z.object({
  name: z.string().min(2, "Restaurant name is required"),
  currency: z.string(),
  tax_rate: z.number().min(0).max(100),
});

export type RestaurantSettingsForm = z.infer<typeof restaurantSettingsSchema>;
