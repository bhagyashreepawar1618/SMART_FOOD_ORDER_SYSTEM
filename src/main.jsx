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
import StaffProfile from "./components/Staff/StaffProfile.jsx";
import StaffDashboard from "./components/staff/Staffdashboard.jsx";
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
        path: "profile",
        element: <StudentProfile />,
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
