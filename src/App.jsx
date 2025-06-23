import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Business from "./pages/Business";
import Users from "./pages/Users";
import Login from "./Login/Login";

function Layout({ children }) {
  const location = useLocation();
  const isLoginPage = location.pathname === "/";

  if (isLoginPage) return children; // Just return Login page without header/sidebar

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="p-4 overflow-auto">{children}</main>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/business" element={<Business />} />
          <Route path="/users" element={<Users />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
