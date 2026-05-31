import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, type RegisterSchema } from "../schema/authSchema";
import { Button } from "../../../components/ui/button";
import PasswordStrength from "./PasswordStrength";
import Divider from "./Divider";
import AuthHeader from "./AuthHeader";
import EmailField from "./EmailField";
import GoogleAuthButton from "./GoogleAuthButton";
import PasswordField from "./PasswordField";
import NameField from "./NameField";

export default function SignupForm() {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
  });

  const password = watch("password", "");

  function onSubmit(data: RegisterSchema) {
    console.log(data);
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
          {!errors.password && <PasswordStrength password={password} />}
        </PasswordField>

        <Button
          type="submit"
          className="h-11 w-full bg-primary text-primary-foreground hover:bg-primary/90 cursor-pointer">
          Sign Up
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
