import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../../assets/images/header.png";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
    bloodGroup: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    email: "",
    password: "",
    role: "patient",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/signup", // 🔗 your backend endpoint
        formData,
        { withCredentials: true } // ensures cookies are stored if your backend sets them
      );

      console.log("Signup success:", response.data);
      alert("Signup successful! You can now log in.");
      navigate("/login");
    } catch (err) {
      console.error("Signup error:", err);
      if (err.response && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#ccf2ed]">
      {/* Left Section */}
      <div className="hidden md:flex flex-1 flex-col justify-center items-center bg-[#ccf2ed]">
        <img src={logo} alt="Dr.32 Teeth" className="w-48 mb-4" />
        <h2 className="text-2xl font-semibold text-gray-700 text-center">
          Join Dr.32 Teeth Family
        </h2>
        <p className="text-gray-600 mt-2 text-center px-8">
          Register to manage your appointments and access dental care services.
        </p>
      </div>

      {/* Right Section */}
      <div className="flex-1 flex items-center justify-center bg-white shadow-2xl rounded-l-3xl">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md p-8 space-y-6"
        >
          <h1 className="text-3xl font-bold text-center text-[#009688] mb-4">
            Create Account
          </h1>

          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded-md text-sm">
              {error}
            </div>
          )}

          {/* Basic Info */}
          <div className="grid grid-cols-2 gap-3">
            <input
              name="firstName"
              placeholder="First Name"
              onChange={handleChange}
              value={formData.firstName}
              required
              className="border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-[#009688]"
            />
            <input
              name="lastName"
              placeholder="Last Name"
              onChange={handleChange}
              value={formData.lastName}
              required
              className="border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-[#009688]"
            />
          </div>

          <input
            name="email"
            placeholder="Email"
            type="email"
            onChange={handleChange}
            value={formData.email}
            required
            className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-[#009688]"
          />

          <input
            name="password"
            placeholder="Password"
            type="password"
            onChange={handleChange}
            value={formData.password}
            required
            className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-[#009688]"
          />

          <input
            name="phone"
            placeholder="Phone Number"
            onChange={handleChange}
            value={formData.phone}
            required
            className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-[#009688]"
          />

          <div className="grid grid-cols-2 gap-3">
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-[#009688]"
            >
              <option value="">Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>

            <input
              name="age"
              placeholder="Age"
              type="number"
              value={formData.age}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-[#009688]"
            />
            <select
              name="bloodGroup"
              value={formData.bloodGroup}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-[#009688]"
            >
              <option value="">Blood Group</option>
                <option value="A+">A+</option>  
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
            </select>
          </div>

          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-[#009688]"
          >
            <option value="patient">Patient</option>
            <option value="doctor">Doctor</option>
          </select>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#009688] text-white py-3 rounded-md hover:bg-[#00796b] transition"
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>

          <p className="text-center text-sm text-gray-600 mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-[#009688] hover:underline">
              Log in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
