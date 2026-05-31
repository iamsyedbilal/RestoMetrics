import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginSchema } from "../schema/authSchema";
import { Button } from "../../../components/ui/button";
import Divider from "./Divider";
import AuthHeader from "./AuthHeader";
import EmailField from "./EmailField";
import GoogleAuthButton from "./GoogleAuthButton";
import PasswordField from "./PasswordField";

export default function SignupForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  function onSubmit(data: LoginSchema) {
    console.log(data);
  }

  return (
    <div className="w-full max-w-md">
      {/* Header */}
      <AuthHeader
        heading="Welcome Back!"
        subtitle="Don't have an account?"
        linkText="Sign Up"
        linkTo="/signup"
      />

      {/* Form */}
      <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
        <EmailField
          register={register("email")}
          error={errors.email?.message}
        />

        <PasswordField
          register={register("password")}
          error={errors.password?.message}
        />

        <Button
          type="submit"
          className="h-11 w-full bg-primary text-primary-foreground hover:bg-primary/90 cursor-pointer">
          Sign In
        </Button>

        {/* Divider */}
        <Divider />
        <GoogleAuthButton />
      </form>

      <div className="mt-8 flex items-center justify-between text-xs text-muted-foreground">
        <p className="mt-6 text-center text-xs text-muted-foreground">
          Privacy Policy
        </p>
        <p className="mt-6 text-center text-xs text-muted-foreground">
          Term of Service
        </p>
      </div>
    </div>
  );
}
