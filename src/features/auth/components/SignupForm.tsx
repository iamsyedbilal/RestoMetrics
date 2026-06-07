import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, type RegisterSchema } from "../schema/authSchema";
import { Button } from "../../../components/ui/button";
const PasswordStrength = lazy(() => import("./PasswordStrength"));
import Divider from "./Divider";
import AuthHeader from "./AuthHeader";
import EmailField from "./EmailField";
const GoogleAuthButton = lazy(() => import("./GoogleAuthButton"));
import PasswordField from "./PasswordField";
import NameField from "./NameField";
import { useSignUp } from "@clerk/clerk-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { lazy, Suspense } from "react";

export default function SignupForm() {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
  });

  const { signUp, isLoaded } = useSignUp();
  const navigate = useNavigate();

  const password = watch("password", "");

  async function onSubmit(data: RegisterSchema) {
    if (!isLoaded) return;

    try {
      await signUp.create({
        emailAddress: data.email,
        password: data.password,
        firstName: data.name,
      });

      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });

      toast.message("Verification code sent");
      reset();
      navigate("/verify-email");
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  }

  return (
    <div className="w-full max-w-md">
      {/* Header */}
      <AuthHeader
        heading="Good Morning!"
        subtitle="Already have an account?"
        linkText="Sign In"
        linkTo="/login"
      />
      {/* Form */}
      <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <NameField register={register("name")} error={errors.name?.message} />

        <EmailField
          register={register("email")}
          error={errors.email?.message}
        />

        <PasswordField
          register={register("password")}
          error={errors.password?.message}>
          <Suspense fallback={null}>
            {!errors.password && <PasswordStrength password={password} />}
          </Suspense>
        </PasswordField>

        <Button
          type="submit"
          className="h-11 w-full bg-primary text-primary-foreground hover:bg-primary/90 cursor-pointer"
          disabled={isSubmitting}>
          {isSubmitting ? "Creating Account..." : "Sign Up"}
        </Button>

        {/* Divider */}
        <Divider />

        <GoogleAuthButton />
      </form>

      <p className="mt-8 text-center text-xs text-muted-foreground leading-relaxed">
        By clicking Sign Up, you agree to our Terms & Conditions.
      </p>
    </div>
  );
}
