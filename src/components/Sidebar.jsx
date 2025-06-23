import React from "react";
import { NavLink } from "react-router-dom";
import { FaBuilding, FaUsers } from "react-icons/fa";
import logo from "../assets/logo.jpeg";
import { Typography } from "@material-tailwind/react";

const navItems = [
  { name: "Business", to: "/business", icon: <FaBuilding /> },
  { name: "Users", to: "/users", icon: <FaUsers /> },
];

function Sidebar() {
  return (
    <aside className="w-60 bg-white text-orange-400 flex flex-col h-screen sticky top-0 shadow-md border-r border-gray-200">
      <div className="flex items-center justify-center gap-2 py-6">
        <img src={logo} alt="Punjabi Pages" className="w-10 h-10 rounded-full" />
        <Typography variant="h5" className="font-bold text-blue-500">
          Punjabi Pages
        </Typography>
      </div>

      <nav className="flex-1 px-4 space-y-1 mt-2">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-md transition-all duration-150 text-sm font-medium
              ${
                isActive
                  ? "bg-blue-500 text-white shadow"
                  : "text-gray-700 hover:bg-blue-50 hover:text-blue-400"
              }`
            }
          >
            <span className="text-base">{item.icon}</span>
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 text-xs text-gray-400 border-t border-gray-100">
        © {new Date().getFullYear()} Admin Dashboard
      </div>
    </aside>
  );
}

export default Sidebar;
