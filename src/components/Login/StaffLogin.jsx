import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useStaff } from "../../contexts/StaffContext";

function StaffLogin() {
  const navigate = useNavigate();
  const { setStaff, setStaffToken } = useStaff();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/admin/login",
        {
          email,
          password,
        },
      );

      console.log("res from backend=", response.data.data);
      localStorage.setItem("adminToken", response.data.data.accessToken);
      setStaff(response.data.data.loggedInAdmin);
      alert("Admin Logged in Successfully ✅");
      navigate("/staffprofile", { replace: true });
    } catch (error) {
      console.log("Admin Login Error:", error);
      alert("Invalid Admin Credentials ❌");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFF5F8]">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-[#AB274F] mb-2">
          Admin Login
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Access Bhojan Buddy Admin Panel
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Admin Email
            </label>
            <input
              type="email"
              placeholder="Enter admin email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#AB274F]"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#AB274F]"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl 
            bg-[#AB274F] 
            hover:bg-[#8e1f42] 
            disabled:bg-[#c46a86] 
            text-white font-semibold tracking-wide 
            transition-all duration-300 
            shadow-md hover:shadow-[#AB274F]/40 
            hover:scale-[1.02] 
            flex items-center justify-center gap-2"
          >
            {loading ? "Logging in..." : "Login as Admin"}
          </button>
        </form>

        {/* Student Login Link */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Are you a student?{" "}
          <Link
            to="/login"
            className="text-[#AB274F] font-semibold hover:underline"
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default StaffLogin;
