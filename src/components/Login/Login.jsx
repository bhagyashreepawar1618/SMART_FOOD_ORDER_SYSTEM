import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  //for loading state
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    //backend call
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/students/login",
        {
          username,
          password,
        },
      );

      localStorage.setItem("accessToken", response.data.data.accessToken);

      setLoading(false);
      setUsername("");
      setPassword("");
      alert("Student is Logged in successfully");
      navigate("/dashboard", { replace: true });
      console.log("response from Backend=", response);
    } catch (e) {}
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFF5F8]">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-[#AB274F] mb-2">
          Student Login
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Login to access Bhojan Buddy
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
            {loading && (
              <svg
                className="w-5 h-5 animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                />
              </svg>
            )}
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Register link */}
        <p className="text-center text-sm text-gray-600 mt-6">
          New student?{" "}
          <Link
            to="/register"
            className="text-[#AB274F] font-semibold hover:underline"
          >
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
