import { Button } from "../../../components/ui/button";
import { GoogleIcon } from "../../../components/shared/GoogleIcon";
import { useSignIn } from "@clerk/clerk-react";
import { toast } from "sonner";

export default function GoogleAuthButton() {
  const { signIn, isLoaded } = useSignIn();

  async function handleGoogleSignIn() {
    if (!isLoaded) return;

    try {
      await signIn.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: "/sso-callback",
        redirectUrlComplete: "/",
      });
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  }

  return (
    <Button
      type="button"
      variant="outline"
      className="h-11 w-full cursor-pointer"
      onClick={handleGoogleSignIn}
      disabled={!isLoaded}>
      <GoogleIcon className="h-4 w-4" />
      {!isLoaded ? "Loading Continue with Google" : "Continue with Google"}
    </Button>
  );
}
