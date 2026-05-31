import { Mail } from "lucide-react";
import type { UseFormRegisterReturn } from "react-hook-form";
import { Label } from "../../../components/ui/label";
import { Input } from "../../../components/ui/input";

type EmailFieldProps = {
  register: UseFormRegisterReturn;
  error?: string;
};

export default function EmailField({ register, error }: EmailFieldProps) {
  return (
    <div>
      <Label htmlFor="email" className="mb-2 block">
        Email
      </Label>

      <div className="relative">
        <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

        <Input
          id="email"
          type="email"
          placeholder="Enter your email"
          {...register}
          className="h-11 pl-10 focus-visible:ring-primary focus:outline-none focus:border-none"
        />
      </div>

      {error && <p className="mt-1 text-xs  text-destructive">{error}</p>}
    </div>
  );
}
