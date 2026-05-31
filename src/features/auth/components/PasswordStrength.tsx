// src/features/auth/components/PasswordStrength.tsx
import zxcvbn from "zxcvbn";
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
  {
    label: "Weak",
    color: "bg-orange-500",
    textColor: "text-orange-500",
  },
  {
    label: "Fair",
    color: "bg-yellow-500",
    textColor: "text-yellow-500",
  },
  {
    label: "Strong",
    color: "bg-sky-500",
    textColor: "text-sky-500",
  },
  {
    label: "Very strong",
    color: "bg-green-500",
    textColor: "text-green-500",
  },
];

export default function PasswordStrength({ password }: PasswordStrengthProps) {
  const result = useMemo(() => zxcvbn(password), [password]);
  const score = result.score;
  const config = strengthConfig[score];

  if (!password) return null;

  return (
    <div className="mt-2 space-y-1.5">
      {/* Strength bars */}
      <div className="flex gap-1">
        {Array.from({ length: 4 }, (_, i) => (
          <div
            key={i}
            className={cn(
              "h-1 flex-1 rounded-full transition-all duration-300",
              i <= score - 1 ? config.color : "bg-muted",
            )}
          />
        ))}
      </div>

      {/* Label + suggestions */}
      <div className="flex items-center justify-between">
        <p className={cn("text-xs font-medium", config.textColor)}>
          {config.label}
        </p>
        {result.feedback.suggestions[0] && (
          <p className="text-xs text-muted-foreground">
            {result.feedback.suggestions[0]}
          </p>
        )}
      </div>
    </div>
  );
}
