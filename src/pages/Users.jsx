import React from "react";
import { FiUserPlus } from "react-icons/fi";

const users = [
  { name: "John Doe", email: "john@example.com", role: "Admin", status: "Active" },
  { name: "Jane Smith", email: "jane@example.com", role: "User", status: "Suspended" },
  { name: "Emily Clark", email: "emily@example.com", role: "Editor", status: "Active" },
  { name: "Michael Brown", email: "michael@example.com", role: "User", status: "Suspended" },
  { name: "John Doe", email: "john@example.com", role: "Admin", status: "Active" },
  { name: "Jane Smith", email: "jane@example.com", role: "User", status: "Suspended" },
  { name: "Emily Clark", email: "emily@example.com", role: "Editor", status: "Active" },
  { name: "Michael Brown", email: "michael@example.com", role: "User", status: "Suspended" },
  { name: "John Doe", email: "john@example.com", role: "Admin", status: "Active" },
  { name: "Jane Smith", email: "jane@example.com", role: "User", status: "Suspended" },
  { name: "Emily Clark", email: "emily@example.com", role: "Editor", status: "Active" },
  { name: "Michael Brown", email: "michael@example.com", role: "User", status: "Suspended" },
];

function Users() {
  return (
    <div className="bg-[#f9fafb] p-4 md:p-6  min-h-screen">
      <div className="flex items-center justify-between mb-6 bg-white shadow-xl rounded-lg p-3 px-5">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">User Management</h2>
          <p className="text-sm text-gray-500">Manage platform users and their roles.</p>
        </div>
      </div>
      <div className="bg-white shadow-xl rounded-lg p-3 px-5">
        <div className="overflow-x-auto bg-white shadow rounded-md mt-5">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-2.5 text-left font-bold text-gray-600 tracking-wider">Name</th>
                <th className="px-6 py-2.5 text-left font-bold text-gray-600 tracking-wider">Email</th>
                <th className="px-6 py-2.5 text-left font-bold text-gray-600 tracking-wider">Role</th>
                <th className="px-6 py-2.5 text-left font-bold text-gray-600 tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {users.map((user, index) => (
                <tr key={index} className="hover:bg-gray-50 transition duration-150">
                  <td className="px-6 py-3 whitespace-nowrap font-medium text-gray-800">{user.name}</td>
                  <td className="px-6 py-3 whitespace-nowrap text-gray-600">{user.email}</td>
                  <td className="px-6 py-3 whitespace-nowrap text-gray-600">{user.role}</td>
                  <td className="px-6 py-3">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold
                    ${user.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                        }`}
                    >
                      {user.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Users;
