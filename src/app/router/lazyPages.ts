import { lazy } from "react";

// Auth pages
export const LoginPage = lazy(() => import("../../pages/auth/LoginPage"));
export const SignupPage = lazy(() => import("../../pages/auth/SignupPage"));

// App pages
export const CustomersPage = lazy(
  () => import("../../pages/customers/CustomersPage"),
);
export const MenuPage = lazy(() => import("../../pages/menu/MenuPage"));
export const OrdersPage = lazy(() => import("../../pages/orders/OrdersPage"));
export const OverviewPage = lazy(
  () => import("../../pages/dashboard/OverviewPage"),
);
export const SettingsPage = lazy(
  () => import("../../pages/settings/SettingsPage"),
);
export const User = lazy(() => import("../../pages/user/User"));

// 404
export const NotFoundPage = lazy(() => import("../../pages/not-found-page"));
