import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import Loading from "../../components/shared/Loading";

export default function ProtectedRoute() {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) {
    return <Loading />;
  }

  if (!isSignedIn) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
