import { createBrowserRouter } from "react-router-dom";

import { Suspense } from "react";

// Lazy pages
import {
  LoginPage,
  SignupPage,
  CustomersPage,
  MenuPage,
  OrdersPage,
  OverviewPage,
  SettingsPage,
  User,
  NotFoundPage,
} from "./lazyPages";

// Layouts
import AuthLayout from "../../layouts/AuthLayout";
import DashboardLayout from "../../layouts/DashboardLayout";

// Auth Components
import VerifyEmail from "../../features/auth/components/VerifyEmail";
import SSOCallback from "../../features/auth/components/SSOCallback";

// Route Guards
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import Loading from "../../components/shared/Loading";

export const router = createBrowserRouter([
  /**
   * 🔓 PUBLIC AUTH ROUTES
   */
  {
    element: (
      <Suspense fallback={<Loading />}>
        <PublicRoute />
      </Suspense>
    ),
    children: [
      {
        element: <AuthLayout />,
        children: [
          { path: "/login", element: <LoginPage /> },
          { path: "/signup", element: <SignupPage /> },
        ],
      },
    ],
  },

  /**
   * 🔓 AUTH FLOW ROUTES (keep outside PublicRoute if needed)
   */
  {
    element: <AuthLayout />,
    children: [
      { path: "/verify-email", element: <VerifyEmail /> },
      { path: "/sso-callback", element: <SSOCallback /> },
    ],
  },

  /**
   * 🔒 PROTECTED APP ROUTES
   */
  {
    element: (
      <Suspense fallback={<Loading />}>
        <ProtectedRoute />
      </Suspense>
    ),
    children: [
      {
        element: <DashboardLayout />,
        children: [
          { path: "/", element: <OverviewPage /> },
          { path: "/orders", element: <OrdersPage /> },
          { path: "/menu", element: <MenuPage /> },
          { path: "/customers", element: <CustomersPage /> },
          { path: "/settings", element: <SettingsPage /> },
          { path: "/me", element: <User /> },
        ],
      },
    ],
  },

  /**
   * ❌ 404
   */
  { path: "*", element: <NotFoundPage /> },
]);
