import axios from "axios";
import { useState } from "react";

function Register() {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();

    console.log("Full Name:", fullName);
    console.log("Username:", username);
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Profile Picture:", profilePicture);

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
      alert("Student registered successfully");
    } catch (e) {
      console.log("Error occured while registration Process", e);
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
            className="w-full py-2 rounded-lg bg-[#AB274F] text-white font-semibold hover:opacity-90 transition"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
