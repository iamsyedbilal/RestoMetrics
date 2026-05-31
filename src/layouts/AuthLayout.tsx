import { Outlet } from "react-router-dom";
import AuthHeroImage from "../features/auth/components/AuthHeroImage";

// Placeholder hook — replace with your real useUser later
// import { useUser } from '@/features/auth/hooks/use-auth'

export default function AuthLayout() {
  // Uncomment when auth is ready
  // const { user, isLoading } = useUser()
  // if (isLoading) return null
  // if (user) return <Navigate to="/" replace />

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-background ">
      {/* Left — form */}
      <div className="flex items-center justify-center p-4 ">
        <div className="w-full max-w-md rounded-2xl">
          <Outlet />
        </div>
      </div>

      {/* Right — food images (desktop only) */}
      <AuthHeroImage />
    </div>
  );
}
