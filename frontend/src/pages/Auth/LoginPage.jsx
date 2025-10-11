import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

import logo from "../../assets/images/header.png";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("patient");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(identifier, password);
      navigate("/"); // ✅ redirect to homepage
    } catch (err) {
      console.error("Login failed:", err.message);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#ccf2ed]">
      {/* Left Section */}
      <div className="hidden md:flex flex-1 flex-col justify-center items-center bg-[#ccf2ed]">
        <img src={logo} alt="Dr.32 Teeth" className="w-48 mb-4" />
        <h2 className="text-2xl font-semibold text-gray-700 text-center">
          Your Smile, Our Priority
        </h2>
        <p className="text-gray-600 mt-2 text-center px-8">
          Login to access your appointments, treatment plans, and more.
        </p>
      </div>

      {/* Right Section */}
      <div className="flex-1 flex items-center justify-center bg-white shadow-2xl rounded-l-3xl">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md p-8 space-y-6"
        >
          <h1 className="text-3xl font-bold text-center text-[#009688] mb-4">
            Login
          </h1>

          <div>
            <label className="block text-gray-700 mb-1">Email or Patient ID</label>
            <input
              type="text"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#009688]"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#009688]"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#009688]"
            >
              <option value="patient">Patient</option>
              <option value="doctor">Doctor</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-[#009688] text-white py-3 rounded-md hover:bg-[#00796b] transition"
          >
            Login
          </button>

          <div className="flex justify-between text-sm text-gray-600 mt-2">
            <a href="/forgot-password" className="hover:underline">
              Forgot password?
            </a>
            <a href="/signup" className="hover:underline">
              New here? Register
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
