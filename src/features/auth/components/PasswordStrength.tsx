import { passwordStrength } from "check-password-strength";
import { useMemo } from "react";
import { cn } from "../../../lib/utils";

interface PasswordStrengthProps {
  password: string;
}

const strengthConfig = [
  {
    label: "Very weak",
    color: "bg-destructive",
    textColor: "text-destructive",
  },
  { label: "Weak", color: "bg-orange-500", textColor: "text-orange-500" },
  { label: "Medium", color: "bg-yellow-500", textColor: "text-yellow-500" },
  { label: "Strong", color: "bg-green-500", textColor: "text-green-500" },
];

export default function PasswordStrength({ password }: PasswordStrengthProps) {
  const result = useMemo(() => {
    if (!password) return null;
    return passwordStrength(password);
  }, [password]);

  if (!password || !result) return null;

  const scoreMap: Record<string, number> = {
    "Too weak": 0,
    Weak: 1,
    Medium: 2,
    Strong: 3,
  };

  const score = scoreMap[result.value] ?? 0;
  const config = strengthConfig[score];

  return (
    <div className="mt-2 space-y-1.5">
      <div className="flex gap-1">
        {Array.from({ length: 4 }, (_, i) => (
          <div
            key={i}
            className={cn(
              "h-1 flex-1 rounded-full transition-all duration-300",
              i <= score ? config.color : "bg-muted",
            )}
          />
        ))}
      </div>

      <p className={cn("text-xs font-medium", config.textColor)}>
        {config.label}
      </p>
    </div>
  );
}
