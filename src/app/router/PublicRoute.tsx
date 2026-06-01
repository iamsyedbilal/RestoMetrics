import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";

export default function PublicRoute() {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) return null;

  if (isSignedIn) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
