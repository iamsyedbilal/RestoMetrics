import { User } from "lucide-react";
import { Label } from "../../../components/ui/label";
import { Input } from "../../../components/ui/input";
import type { UseFormRegisterReturn } from "react-hook-form";

type NameFieldProps = {
  register: UseFormRegisterReturn;
  error?: string;
};

export default function NameField({ register, error }: NameFieldProps) {
  return (
    <div>
      <Label htmlFor="name" className="mb-2 block">
        Name
      </Label>
      <div className="relative">
        <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

        <Input
          id="name"
          placeholder="Enter your name"
          {...register}
          className="h-11 pl-10 focus-visible:ring-primary focus:outline-none focus:border-none"
        />
      </div>
      {error && <p className="mt-1 text-xs  text-destructive">{error}</p>}
    </div>
  );
}
