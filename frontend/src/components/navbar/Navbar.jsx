import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import logo from "../../assets/images/header.png";
import { UserCircle2 } from "lucide-react";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();

  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const links = [
    { href: "#hero", text: "Home" },
    { href: "#team", text: "About Us" },
    { href: "#center", text: "Our Center" },
    { href: "#services", text: "Our Services" },
    { href: "#", text: "Implant Patients" },
    { href: "#", text: "International Patients" },
    { href: "#", text: "Our Strength" },
    { href: "#appointment", text: "Book an Appointment" },
  ];

  return (
    <nav className="sticky top-0 bg-[#ccf2ed] z-50 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-center px-6 py-3">
        {/* Logo */}
        <div className="flex-shrink-0 flex items-center">
          <Link to="/" onClick={() => setOpen(false)}>
            <img
              src={logo}
              alt="Dr. 32 Teeth Logo"
              className="h-16 w-auto object-contain"
            />
          </Link>
        </div>

        {/* Hamburger Icon for Mobile */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-teal-800 focus:outline-none text-3xl"
        >
          {open ? "✖" : "☰"}
        </button>

        {/* Nav Links */}
        <div
          className={`${
            open
              ? "flex flex-col absolute top-20 left-0 w-full bg-[#ccf2ed] shadow-md border-t border-gray-200"
              : "hidden"
          } md:flex md:flex-row md:static md:shadow-none md:border-none md:w-auto md:items-center md:gap-8 transition-all duration-300 ease-in-out`}
        >
          {/* Page Links */}
          {links.map((link) => (
            <a
              key={link.text}
              href={link.href}
              className="text-gray-800 hover:text-[#00796b] transition"
            >
              {link.text}
            </a>
          ))}

          {/* Conditional Buttons */}
          {user ? (
            <div className="flex items-center space-x-3">
              <span className="text-gray-800 font-medium">
                Hello, {user.firstName}
              </span>
              <Link
                to="/profile"
                className="flex items-center text-[#009688] hover:text-[#00796b]"
              >
                <UserCircle2 className="w-6 h-6" />
              </Link>
              <button
                onClick={handleLogout}
                className="bg-[#009688] text-white px-4 py-2 rounded-md hover:bg-[#00796b]"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-3">
              <Link
                to="/login"
                className="bg-[#009688] text-white px-4 py-2 rounded-md hover:bg-[#00796b]"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="text-[#009688] font-medium hover:underline"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;