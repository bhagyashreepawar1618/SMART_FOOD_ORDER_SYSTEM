import { useState } from "react";
import { Link } from "react-router";

const LoginHeader = () => {
  const [active, setActive] = useState("student");

  return (
    <div className="w-full bg-white shadow-md">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo / App Name */}
        <h1 className="text-2xl font-bold text-[#AB274F] tracking-wide">
          Food Management
        </h1>

        {/* Section Toggle */}
        <div className="flex bg-[#f8e9ee] p-1 rounded-xl">
          {/* Student Button */}
          <Link to="/login">
            <button
              onClick={() => setActive("student")}
              className={`px-6 py-2 rounded-lg font-medium transition-all duration-300 ${
                active === "student"
                  ? "bg-[#AB274F] text-white shadow-md"
                  : "text-[#AB274F] hover:bg-[#f3cfd8]"
              }`}
            >
              Student
            </button>
          </Link>

          {/* Admin Button */}
          <Link to="/login/staff">
            <button
              onClick={() => setActive("admin")}
              className={`px-6 py-2 rounded-lg font-medium transition-all duration-300 ${
                active === "admin"
                  ? "bg-[#AB274F] text-white shadow-md"
                  : "text-[#AB274F] hover:bg-[#f3cfd8]"
              }`}
            >
              Admin
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginHeader;
