import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import logo from "../../assets/images/header.png";
import { UserCircle2, Menu, X } from "lucide-react";

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
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 py-3">
        {/* Logo */}
        <div className="flex-shrink-0 flex items-center">
          <Link to="/" onClick={() => setOpen(false)}>
            <img
              src={logo}
              alt="Dr. 32 Teeth Logo"
              className="h-12 sm:h-16 w-auto object-contain"
            />
          </Link>
        </div>

        {/* Hamburger Icon for Mobile */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-teal-800 focus:outline-none z-50 p-2"
          aria-label="Toggle menu"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Mobile Menu Overlay */}
        {open && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-40"
            onClick={() => setOpen(false)}
          ></div>
        )}

        {/* Nav Links */}
        <div
          className={`${
            open
              ? "flex flex-col fixed top-0 right-0 h-full w-[85%] max-w-sm bg-[#ccf2ed] shadow-2xl border-l border-gray-200 z-50 overflow-y-auto"
              : "hidden"
          } md:flex md:flex-row md:static md:shadow-none md:border-none md:w-auto md:items-center md:gap-4 lg:gap-6 transition-all duration-300 ease-in-out`}
        >
          {/* Close button for mobile menu */}
          {open && (
            <div className="flex justify-between items-center p-4 border-b border-gray-300 md:hidden">
              <h3 className="text-lg font-semibold text-gray-800">Menu</h3>
              <button
                onClick={() => setOpen(false)}
                className="text-teal-800 focus:outline-none"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          )}

          {/* Page Links */}
          <div
            className={`${
              open ? "flex flex-col py-4" : "flex items-center gap-4 lg:gap-6"
            }`}
          >
            {links.map((link) => (
              <a
                key={link.text}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`${
                  open
                    ? "px-6 py-3 text-base hover:bg-[#b8e8e1] transition"
                    : "text-sm lg:text-base"
                } text-gray-800 hover:text-[#00796b] transition-colors font-medium`}
              >
                {link.text}
              </a>
            ))}
          </div>

          {/* Conditional Buttons */}
          <div
            className={`${
              open
                ? "mt-auto border-t border-gray-300 p-4 bg-gray-50"
                : "flex items-center gap-2 lg:gap-3"
            }`}
          >
            {user ? (
              <div
                className={`${
                  open
                    ? "flex flex-col gap-3"
                    : "flex items-center gap-2 lg:gap-3"
                }`}
              >
                <span
                  className={`${
                    open
                      ? "px-0 text-base mb-2"
                      : "hidden lg:inline-block text-sm lg:text-base"
                  } text-gray-800 font-medium`}
                >
                  Hello, {user.firstName}
                </span>
                <Link
                  to="/profile"
                  onClick={() => setOpen(false)}
                  className={`${
                    open
                      ? "px-6 py-3 text-base hover:bg-[#b8e8e1] transition rounded"
                      : "flex items-center"
                  } text-[#009688] hover:text-[#00796b] transition-colors`}
                >
                  <UserCircle2 className="w-5 h-5 lg:w-6 lg:h-6" />
                  {open && <span className="ml-2">Profile</span>}
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setOpen(false);
                  }}
                  className={`${
                    open
                      ? "px-6 py-3 text-base"
                      : "px-3 py-1.5 lg:px-4 lg:py-2 text-sm lg:text-base"
                  } w-full md:w-auto bg-[#009688] text-white rounded-md hover:bg-[#00796b] transition-colors text-center font-medium`}
                >
                  Logout
                </button>
              </div>
            ) : (
              <div
                className={`${
                  open
                    ? "flex flex-col gap-2"
                    : "flex items-center gap-2 lg:gap-3"
                }`}
              >
                <Link
                  to="/login"
                  onClick={() => setOpen(false)}
                  className={`${
                    open
                      ? "px-6 py-3 text-base"
                      : "px-3 py-1.5 lg:px-4 lg:py-2 text-sm lg:text-base"
                  } w-full md:w-auto bg-[#009688] text-white rounded-md hover:bg-[#00796b] transition-colors text-center font-medium`}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setOpen(false)}
                  className={`${
                    open ? "px-6 py-3 text-base" : "text-sm lg:text-base"
                  } w-full md:w-auto text-center text-[#009688] font-medium hover:underline transition-colors`}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
