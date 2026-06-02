import { useState } from "react";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { useRestaurant } from "../hooks/useRestaurant";
import { toast } from "sonner";

export default function OnboardingForm() {
  const [name, setName] = useState("");
  const { createRestaurant, isCreating } = useRestaurant();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!name.trim()) return;

    try {
      await createRestaurant(name.trim());
      toast.success("Restaurant created!");
    } catch {
      toast.error("Something went wrong");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-lg space-y-6 rounded-xl border bg-card p-8 shadow-sm">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Welcome to RestoMetrics 👋
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Let's start by setting up your restaurant.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            placeholder="Restaurant name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="h-11"
          />
          <Button
            type="submit"
            className="w-full h-11"
            disabled={isCreating || !name.trim()}>
            {isCreating ? "Creating..." : "Create Restaurant"}
          </Button>
        </form>
      </div>
    </div>
  );
}
