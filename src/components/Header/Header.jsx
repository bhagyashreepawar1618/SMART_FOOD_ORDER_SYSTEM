import React from "react";
import "../../../src/index.css";
import { Link, NavLink } from "react-router-dom";

function Header() {
  return (
    <header className="w-full bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo / Title */}
        <h1 className="text-2xl font-bold text-[#AB274F]">BhojanBuddy</h1>

        {/* Navigation */}

        <nav className="flex gap-6 text-gray-800 font-medium">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `transition ${
                isActive
                  ? "text-[#AB274F] border-b-2 border-[#AB274F]"
                  : "hover:text-[#AB274F]"
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/register"
            className={({ isActive }) =>
              `transition ${
                isActive
                  ? "text-[#AB274F] border-b-2 border-[#AB274F]"
                  : "hover:text-[#AB274F]"
              }`
            }
          >
            Register
          </NavLink>
          <NavLink
            to="/login"
            className={({ isActive }) =>
              `transition ${
                isActive
                  ? "text-[#AB274F] border-b-2 border-[#AB274F]"
                  : "hover:text-[#AB274F]"
              }`
            }
          >
            Login
          </NavLink>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `transition ${
                isActive
                  ? "text-[#AB274F] border-b-2 border-[#AB274F]"
                  : "hover:text-[#AB274F]"
              }`
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `transition ${
                isActive
                  ? "text-[#AB274F] border-b-2 border-[#AB274F]"
                  : "hover:text-[#AB274F]"
              }`
            }
          >
            Profile
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Header;
