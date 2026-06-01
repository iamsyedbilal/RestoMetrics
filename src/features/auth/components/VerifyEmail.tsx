import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSignUp } from "@clerk/clerk-react";
import { Button } from "../../../components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "../../../components/ui/input-otp";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export default function VerifyEmail() {
  const [code, setCode] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);

  const { signUp, isLoaded, setActive } = useSignUp();
  const navigate = useNavigate();

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLoaded || code.length !== 6) return;

    setIsVerifying(true);

    try {
      const result = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (result.status === "complete") {
        await setActive({
          session: result.createdSessionId,
        });

        toast.success("Email verified successfully");
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      toast.error("Invalid verification code");
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <h1 className="text-2xl font-bold">Verify your email</h1>

      <p className="text-muted-foreground mt-2">
        Enter the 6-digit code sent to your email.
      </p>

      <form onSubmit={handleVerify} className="mt-6 space-y-6">
        <div className="flex justify-center">
          <InputOTP maxLength={6} value={code} onChange={setCode}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>

        <Button
          type="submit"
          className="w-full"
          disabled={isVerifying || code.length !== 6}>
          {isVerifying && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isVerifying ? "Verifying..." : "Verify Email"}
        </Button>
      </form>
    </div>
  );
}
