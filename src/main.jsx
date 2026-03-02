import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from "./components/Layout/Layout.jsx";
import Home from "./components/home/Home.jsx";
import Login from "./components/Login/Login.jsx";
import Menu from "./components/menuDashboard/Menu.jsx";

import "./index.css";
import StaffLogin from "./components/Login/StaffLogin.jsx";
import StudentRegister from "./components/register/StudentRegister.jsx";
import StaffRegister from "./components/register/StaffRegister.jsx";
import LoginLayout from "./components/Login/loginLayout.jsx";
import RegisterLayout from "./components/register/RegisterLayout.jsx";
import { StudentProvider } from "./contexts/studentContext.jsx";
import StudentProfile from "./components/student/StudentProfile.jsx";
import { StaffProvider } from "./contexts/StaffContext.jsx";
import StaffProfile from "./components/staff/StaffProfile.jsx";
import StaffDashboard from "./components/staff/Staffdashboard.jsx";
import OrderSummary from "./components/student/OrderSummary.jsx";
import AdminUpdatePassword from "./components/staff/UpdatePassword.jsx";
import AdminUpdateProfile from "./components/staff/UpdateProfile.jsx";
import StaffOrdersDashboard from "./components/staff/TotalData.jsx";
const route = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "login",
        children: [
          {
            path: "",
            element: <LoginLayout />,
            children: [
              {
                path: "",
                element: <Login />,
              },
              {
                path: "staff",
                element: <StaffLogin />,
              },
            ],
          },
        ],
      },
      {
        path: "staff-total-data",
        element: <StaffOrdersDashboard />,
      },
      {
        path: "profile",
        element: <StudentProfile />,
      },
      {
        path: "/ordersummary",
        element: <OrderSummary />,
      },
      {
        path: "staffprofile",
        element: <StaffProfile />,
      },
      {
        path: "dashboard",
        element: <Menu />,
      },
      {
        path: "staff-dashboard",
        element: <StaffDashboard />,
      },
      {
        path: "register",
        children: [
          {
            path: "",
            element: <RegisterLayout />,
            children: [
              {
                path: "",
                element: <StudentRegister />,
              },
              {
                path: "staff",
                element: <StaffRegister />,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: "change-staff-password",
    element: <AdminUpdatePassword />,
  },
  {
    path: "staff-update-profile",
    element: <AdminUpdateProfile />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <StaffProvider>
      <StudentProvider>
        <RouterProvider router={route}></RouterProvider>
      </StudentProvider>
    </StaffProvider>
  </StrictMode>,
);
