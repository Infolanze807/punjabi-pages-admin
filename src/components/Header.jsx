import React from "react";
import { IoLogOutOutline } from "react-icons/io5";
import { HiMenu } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { logout, selectIsAuthenticated } from "../redux/features/authSlice";
import { useDispatch, useSelector } from "react-redux";
import logo from "../assets/logo.jpeg"
import { Typography } from "@material-tailwind/react";
import { FaUserCircle } from "react-icons/fa";

function Header({ onMenuClick }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  return (
    <header className="bg-white shadow-sm border-b border-gray-100 px-6 py-3 sticky top-0 z-40">
      <div className="flex justify-between items-center">
        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors duration-200"
          onClick={onMenuClick}
        >
          <HiMenu className="text-xl" />
        </button>

        <div className="hidden md:flex items-center gap-3">
          <img src={logo} alt="Punjabi Pages" className="w-10 h-10 rounded-xl object-cover shadow-sm border-2 border-white" />
          <div>
            <Typography variant="h5" className="font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Punjabi Pages
            </Typography>
            <p className="text-xs text-gray-500">Admin Dashboard</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {user?.name && (
            <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors duration-200">
              <div className="relative">
                <FaUserCircle className="text-3xl text-blue-600" />
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              <div className="hidden sm:block">
                <p className="text-xs text-gray-500 font-medium">Welcome back,</p>
                <p className="text-sm font-semibold text-gray-900">{user.name.split(" ")[0]}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
