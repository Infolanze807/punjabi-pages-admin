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
  // { name: "Users", to: "/users", icon: <FaUsers /> },
];

const Sidebar = ({ isOpen, onClose }) => {
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
          className="fixed inset-0 bg-black bg-opacity-30 z-30 md:hidden backdrop-blur-sm"
        />
      )}

      <aside
        className={`fixed z-40 top-0 left-0 h-screen w-64 bg-white border-r border-gray-100 shadow-lg transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:static md:z-auto`}
      >
        <div className="flex items-center justify-between px-6 py-6 border-b border-gray-100 md:hidden">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Punjabi Pages" className="w-10 h-10 rounded-xl object-cover shadow-sm border-2 border-white" />
            <div>
              <Typography variant="h5" className="font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Punjabi Pages
              </Typography>
              <p className="text-xs text-gray-500">Admin Panel</p>
            </div>
          </div>
          
          {/* Close button for mobile */}
          {/* <button
            onClick={onClose}
            className="md:hidden p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors duration-200"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button> */}
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          <div className="mb-4">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 mb-3">
              Navigation
            </h3>
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.to}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 mb-2 rounded-xl transition-all duration-200 text-sm font-medium relative
                  ${isActive
                    ? "bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 border border-blue-200 shadow-sm"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`
                }
              >
                <span className={`text-lg transition-colors duration-200 ${
                  'isActive' ? 'text-blue-600' : 'text-gray-400'
                }`}>
                  {item.icon}
                </span>
                <span>{item.name}</span>
                {({ isActive }) => isActive && (
                  <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-500 rounded-r-full"></div>
                )}
              </NavLink>
            ))}
          </div>
        </nav>

        <div className="p-4 border-t border-gray-100">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-red-50 hover:text-red-600 transition-all duration-200 group"
          >
            <IoLogOutOutline className="text-lg text-gray-400 group-hover:text-red-500 transition-colors duration-200" />
            <span className="font-medium text-sm">Sign Out</span>
          </button>
          
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex items-center justify-end text-xs text-gray-400">
              {/* <span>Version 2.1.0</span> */}
              <span>© 2025</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
export { Sidebar };
