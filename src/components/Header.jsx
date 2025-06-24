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
    <header className="bg-[#f9fafb] shadow px-4 py-3 sticky top-0 z-40 border-b border-gray-200">
      <div className="flex justify-between items-center">
        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl text-gray-700"
          onClick={onMenuClick}
        >
          <HiMenu />
        </button>

        <div className="hidden md:flex items-center gap-2">
          <img src={logo} alt="Punjabi Pages" className="w-10 h-10 rounded-full" />
          <Typography variant="h5" className="font-bold text-blue-500">
            Punjabi Pages
          </Typography>
        </div>


        <div className="flex items-center gap-4 hover:bg-gray-100 p-2 rounded-md">
          {user?.name && (
            <div className="flex items-center gap-3 text-gray-800 font-medium ">
              <FaUserCircle className="flex  text-3xl text-blue-600" />
              <div>
              <h1 className="text-xs text-gray-500">Welcome back,</h1>
              <h1 className="text-sm">{user.name.split(" ")[0]}</h1>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
