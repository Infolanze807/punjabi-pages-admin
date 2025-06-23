import React from "react";
import { IoLogOutOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate("/")
  }

  return (
    <header className="bg-white shadow px-6 py-4 w-full sticky top-0 z-50 border-b border-gray-200">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold text-blue-600">Admin Dashboard</h1>

        <div className="flex items-center gap-4">
          <span className="text-gray-800 font-medium">Admin User</span>
          <button
            className="flex items-center gap-1 px-3 py-1.5 rounded-md text-sm font-medium text-gray-500 hover:text-red-500 hover:bg-gray-100 transition-colors"
            title="Logout"
            onClick={handleClick}
          >
            <IoLogOutOutline className="text-lg" />
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
