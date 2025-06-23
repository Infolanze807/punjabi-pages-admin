// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Business from "./pages/Business";
import Users from "./pages/Users";
import Login from "./Login/Login";
import PublicLayout from "./layouts/PublicLayout";
import PrivateLayout from "./layouts/PrivateLayout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./redux/store";
import { setupAxiosInterceptors } from "./redux/axiosConfig";

// Set up axios interceptors with the store
setupAxiosInterceptors(store);

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Routes>
            {/* Public Route */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<Login />} />
            </Route>

            {/* Private Routes */}
            <Route element={<PrivateLayout />}>
              <Route path="/business" element={<Business />} />
              <Route path="/users" element={<Users />} />
            </Route>
          </Routes>

          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
