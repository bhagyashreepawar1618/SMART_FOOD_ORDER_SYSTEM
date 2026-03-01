import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";
function StudentRegister() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const StudentFormData = new FormData();

    StudentFormData.append("fullname", fullName);
    StudentFormData.append("email", email);
    StudentFormData.append("password", password);
    StudentFormData.append("profilePicture", profilePicture);
    StudentFormData.append("username", username);

    //backend call here

    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/students/register",
        StudentFormData,
      );

      console.log("response from backend is= ", response);
      setLoading(false);
      alert("Student registered successfully");
      navigate("/login", { replace: true });
    } catch (e) {
      console.log("Error occured while registration Process", e);
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFF5F8]">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-center text-[#AB274F] mb-2">
          Student Register
        </h2>

        <p className="text-center text-gray-500 mb-6">Create your account</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-[#AB274F]"
          />

          {/* Username */}
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-[#AB274F]"
          />

          {/* Email */}
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-[#AB274F]"
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Create Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-[#AB274F]"
          />

          {/* Profile Picture */}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setProfilePicture(e.target.files[0])}
            className="w-full"
            required
          />

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
            {loading ? "Registration is going on" : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default StudentRegister;
