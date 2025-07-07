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
    <div className="bg-gradient-to-br from-slate-50 to-purple-50 p-6 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slate-800 mb-2">User Management</h2>
              <p className="text-slate-600">Manage platform users and their roles.</p>
            </div>
            <button className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white px-4 py-2.5 rounded-xl hover:from-purple-700 hover:to-purple-800 transition-all duration-200 font-medium shadow-md hover:shadow-lg">
              <FiUserPlus className="text-sm" />
              <span className="text-sm">Add User</span>
            </button>
          </div>
        </div>
        
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-slate-100 to-purple-50">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold text-slate-700 text-sm uppercase tracking-wider border-b border-slate-200">Name</th>
                  <th className="px-6 py-4 text-left font-semibold text-slate-700 text-sm uppercase tracking-wider border-b border-slate-200">Email</th>
                  <th className="px-6 py-4 text-left font-semibold text-slate-700 text-sm uppercase tracking-wider border-b border-slate-200">Role</th>
                  <th className="px-6 py-4 text-left font-semibold text-slate-700 text-sm uppercase tracking-wider border-b border-slate-200">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {users.map((user, index) => (
                  <tr key={index} className="hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 transition-all duration-200 group">
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-slate-800 group-hover:text-slate-900">{user.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-slate-600 group-hover:text-slate-700">{user.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-slate-600">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                        user.role === "Admin" ? "bg-gradient-to-r from-purple-100 to-purple-200 text-purple-800 border-purple-300" :
                        user.role === "Editor" ? "bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 border-blue-300" :
                        "bg-gradient-to-r from-slate-100 to-slate-200 text-slate-800 border-slate-300"
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border
                        ${user.status === "Active"
                            ? "bg-gradient-to-r from-green-100 to-green-200 text-green-800 border-green-300"
                            : "bg-gradient-to-r from-orange-100 to-orange-200 text-orange-800 border-orange-300"
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
    </div>
  );
}

export default Users;
