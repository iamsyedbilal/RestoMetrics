import { createBrowserRouter } from "react-router-dom";

// Auth Pages
import {
  LoginPage,
  SignupPage,
  CustomersPage,
  MenuPage,
  NotFoundPage,
  OrdersPage,
  OverviewPage,
  SettingsPage,
} from "../../pages";

// Layout
import AuthLayout from "../../layouts/AuthLayout";
import DashboardLayout from "../../layouts/DashboardLayout";

export const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/signup",
        element: <SignupPage />,
      },
    ],
  },
  {
    element: <DashboardLayout />,
    children: [
      {
        path: "/",
        element: <OverviewPage />,
      },
      {
        path: "/orders",
        element: <OrdersPage />,
      },
      {
        path: "/menu",
        element: <MenuPage />,
      },
      {
        path: "/customers",
        element: <CustomersPage />,
      },
      {
        path: "/settings",
        element: <SettingsPage />,
      },
    ],
  },
  { path: "*", element: <NotFoundPage /> },
]);
