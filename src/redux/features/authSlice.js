import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axiosConfig from "../axiosConfig";

export const login = createAsyncThunk("auth/login", async (loginData) => {
  try {
    const response = await axiosConfig.post("auth/login", loginData);
    return response.data;
  } catch (error) {
    throw (
      error.response?.data?.error || error.message || "Something went wrong"
    );
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
    isAuthenticated: false,
    loading: false,
    error: null,
    message: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        const { user, token, message } = action.payload;
        // state.user = action.payload.user;
        // state.token = action.payload.token;
        // state.isAuthenticated = true;
        // state.message = action.payload.message;
        // toast.success(state.message);
        if (user.role === "admin") {
          state.user = action.payload.user;
          state.token = action.payload.token;
          state.isAuthenticated = true;
          state.message = action.payload.message;
          toast.success(state.message);
        } else {
          state.user = null;
          state.token = null;
          state.isAuthenticated = false;
          state.message = null;
          toast.error("Access denied: Role is not admin");
        }
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.error = action.error.message;
        toast.error(state.error);
      });
  },
});

export const { logout } = authSlice.actions;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export default authSlice.reducer;
