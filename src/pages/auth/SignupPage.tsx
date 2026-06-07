import { lazy, Suspense } from "react";
import Loading from "../../components/shared/Loading";

const SignupForm = lazy(
  () => import("../../features/auth/components/SignupForm"),
);

export default function SignupPage() {
  return (
    <div>
      <Suspense fallback={<Loading />}>
        <SignupForm />
      </Suspense>
    </div>
  );
}
