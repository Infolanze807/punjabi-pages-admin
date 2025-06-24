import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaBuilding, FaUsers } from "react-icons/fa";
import logo from "../assets/logo.jpeg";
import { Typography } from "@material-tailwind/react";
import { IoLogOutOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { logout } from "../redux/features/authSlice";

const navItems = [
  { name: "Business", to: "/business", icon: <FaBuilding /> },
  { name: "Users", to: "/users", icon: <FaUsers /> },
];

function Sidebar({ isOpen, onClose }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
    if (onClose) onClose();
  };

  return (
    <>
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black bg-opacity-30 z-30 md:hidden"
        />
      )}

      <aside
        className={`fixed z-40 top-0 left-0 h-screen w-60 bg-[#f9fafb] border-r border-gray-200 shadow-md transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:static md:z-auto`}
      >
        <div className="flex items-center md:hidden justify-between px-4 py-4 border-b">
          <div className="flex items-center gap-2">
            <img src={logo} alt="Punjabi Pages" className="w-10 h-10 rounded-full" />
            <Typography variant="h5" className="font-bold text-blue-500">
              Punjabi Pages
            </Typography>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-1 mt-5">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.to}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-md transition-all duration-150 text-sm font-medium
                ${isActive
                  ? "bg-blue-500 text-white shadow"
                  : "text-gray-700 hover:bg-blue-50 hover:text-blue-400"
                }`
              }
            >
              <span className="text-base">{item.icon}</span>
              <span>{item.name}</span>
            </NavLink>
          ))}

          {/* Logout Item */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-2 rounded-md transition-all duration-150 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-red-500 w-full"
          >
            <span className="text-base">
              <IoLogOutOutline />
            </span>
            <span>Logout</span>
          </button>
        </nav>

        <div className="p-4 text-xs text-gray-400 border-t border-gray-100">
          © {new Date().getFullYear()} Admin Dashboard
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
