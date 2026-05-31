import { Button } from "../../../components/ui/button";
import { GoogleIcon } from "../../../components/shared/GoogleIcon";

export default function GoogleAuthButton() {
  return (
    <Button
      type="button"
      variant="outline"
      className="h-11 w-full cursor-pointer">
      <GoogleIcon className="h-4 w-4" />
      Continue with Google
    </Button>
  );
}
