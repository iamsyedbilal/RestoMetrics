import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";

export default function SSOCallback() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-muted-foreground">Signing you in...</p>

      <AuthenticateWithRedirectCallback />
    </div>
  );
}
