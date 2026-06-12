import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { Label } from "../../../components/ui/label";

import {
  useRestaurant,
  useUpdateRestaurant,
  useUploadLogo,
} from "../hooks/useRestaurant";
import {
  restaurantSettingsSchema,
  type RestaurantSettingsForm,
} from "../schema/restaurantSettingSchema";
import { toast } from "sonner";

export default function RestaurantSettings() {
  const { restaurant } = useRestaurant();
  const { mutate: updateRestaurant, isPending: isUpdating } =
    useUpdateRestaurant();
  const { mutateAsync: uploadLogo } = useUploadLogo();

  const [logoFile, setLogoFile] = useState<File | null>(null);
  const hasInitialized = useRef(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RestaurantSettingsForm>({
    resolver: zodResolver(restaurantSettingsSchema),
    defaultValues: {
      name: "",
      currency: "PKR",
      tax_rate: 0,
    },
  });

  useEffect(() => {
    if (!restaurant || hasInitialized.current) return;

    reset({
      name: restaurant.name ?? "",
      currency: restaurant.currency ?? "PKR",
      tax_rate: Number(restaurant.tax_rate ?? 0),
    });

    hasInitialized.current = true;
  }, [restaurant, reset]);

  async function onSubmit(values: RestaurantSettingsForm) {
    if (!restaurant) return;

    try {
      let logoUrl = restaurant.logo_url;

      if (logoFile) {
        logoUrl = await uploadLogo({
          restaurantId: restaurant.id,
          file: logoFile,
        });
      }

      await updateRestaurant({
        restaurantId: restaurant.id,
        updates: {
          ...values,
          tax_rate: Number(values.tax_rate),
          logo_url: logoUrl,
        },
      });

      setLogoFile(null);

      toast.success("Settings saved!");
    } catch {
      toast.error("Failed to save settings");
    }
  }

  return (
    <Card className="max-w-3xl">
      <CardHeader>
        <CardTitle>Restaurant Settings</CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Logo */}
          <div className="space-y-2">
            <Label>Restaurant Logo</Label>

            {restaurant?.logo_url && (
              <img
                src={restaurant.logo_url}
                alt={restaurant?.name ?? "Restaurant logo"}
                className="h-20 w-20 rounded-xl border object-cover"
              />
            )}

            <Input
              type="file"
              accept="image/*"
              onChange={(e) => setLogoFile(e.target.files?.[0] ?? null)}
            />
          </div>

          {/* Name */}
          <div className="space-y-2">
            <Label>Restaurant Name</Label>
            <Input {...register("name")} placeholder="Restaurant name" />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name.message}</p>
            )}
          </div>

          {/* Currency */}
          <div className="space-y-2">
            <Label>Currency</Label>

            <select
              {...register("currency")}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
              <option value="PKR">PKR</option>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
              <option value="AED">AED</option>
            </select>
          </div>

          {/* Tax */}
          <div className="space-y-2">
            <Label>Tax Rate (%)</Label>

            <Input
              type="number"
              step="0.01"
              {...register("tax_rate", {
                valueAsNumber: true,
              })}
            />

            {errors.tax_rate && (
              <p className="text-sm text-destructive">
                {errors.tax_rate.message}
              </p>
            )}
          </div>

          <Button type="submit" disabled={isUpdating}>
            {isUpdating ? "Saving..." : "Save Changes"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
