import { Eye, EyeOff, Lock } from "lucide-react";
import { useState } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";
import { Label } from "../../../components/ui/label";
import { Input } from "../../../components/ui/input";

type PasswordFieldProps = {
  register: UseFormRegisterReturn;
  error?: string;
  children?: React.ReactNode;
};

export default function PasswordField({
  register,
  error,
  children,
}: PasswordFieldProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <Label htmlFor="password" className="mb-2 block">
        Password
      </Label>

      <div className="relative">
        <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

        <Input
          id="password"
          type={showPassword ? "text" : "password"}
          placeholder="Enter your password"
          {...register}
          className="h-11 pl-10 focus-visible:ring-primary focus:outline-none focus:border-none"
        />

        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-3 top-1/2 -translate-y-1/2">
          {showPassword ? (
            <EyeOff className="h-4 w-4 cursor-pointer text-muted-foreground" />
          ) : (
            <Eye className="h-4 w-4 cursor-pointer text-muted-foreground" />
          )}
        </button>
      </div>

      {children}

      {error && <p className="mt-1 text-xs  text-destructive">{error}</p>}
    </div>
  );
}
