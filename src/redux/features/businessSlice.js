import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosConfig from "../axiosConfig";
import { toast } from "react-toastify";

// Async Thunk
export const getBusinessCategory = createAsyncThunk(
  "business/getBusinessCategory",
  async ({ keyword, page, status }, { rejectWithValue }) => {
    try {
      let url = `admin/?`;

      if (keyword) url += `keyword=${encodeURIComponent(keyword)}&`;
      if (page) url += `page=${page}&`;
      if (status !== undefined) url += `status=${status}&`;

      const response = await axiosConfig.get(url);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || error.message || "Something went wrong"
      );
    }
  }
);

export const statusBussiness = createAsyncThunk(
  "business/statusBussiness",
  async ({ bussinessId, statusData }) => {
    try {
      const response = await axiosConfig.patch(
        `admin/status/${bussinessId}`,
        statusData
      );
      return response.data;
    } catch (error) {
      throw (
        error.response?.data?.error || error.message || "Something went wrong"
      );
    }
  }
);

export const featureBussiness = createAsyncThunk(
  "business/featureBussiness",
  async ({ bussinessId, featureData }) => {
    try {
      const response = await axiosConfig.patch(
        `admin/feature/${bussinessId}`,
        featureData
      );
      return response.data;
    } catch (error) {
      throw (
        error.response?.data?.error || error.message || "Something went wrong"
      );
    }
  }
);

export const popularBussiness = createAsyncThunk(
  "business/popularBussiness",
  async ({ bussinessId, popularData }) => {
    try {
      const response = await axiosConfig.patch(
        `admin/popular/${bussinessId}`,
        popularData
      );
      return response.data;
    } catch (error) {
      throw (
        error.response?.data?.error || error.message || "Something went wrong"
      );
    }
  }
);

// Slice
const businessSlice = createSlice({
  name: "business",
  initialState: {
    BusinessCategory: [],
    loading: false,
    loading2: false,
    error: null,
    message: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBusinessCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBusinessCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.BusinessCategory = action.payload;
        state.message = action.payload?.message || "Success";
      })
      .addCase(getBusinessCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch data";
      })
      .addCase(statusBussiness.pending, (state) => {
        state.loading = true;
        state.loading2 = true;
      })
      .addCase(statusBussiness.fulfilled, (state, action) => {
        state.loading = false;
        state.loading2 = false;
        state.updateBussiness = action.payload;
        state.message = action.payload.message;
        toast.success(action.payload.message);
      })
      .addCase(statusBussiness.rejected, (state, action) => {
        state.loading = false;
        state.loading2 = false;
        state.error = action.error.message;
        toast.error(state.error);
      })
      .addCase(featureBussiness.pending, (state) => {
        state.loading = true;
        state.loading2 = true;
      })
      .addCase(featureBussiness.fulfilled, (state, action) => {
        state.loading = false;
        state.loading2 = false;
        state.updateBussiness = action.payload;
        state.message = action.payload.message;
        toast.success(action.payload.message);
      })
      .addCase(featureBussiness.rejected, (state, action) => {
        state.loading = false;
        state.loading2 = false;
        state.error = action.error.message;
        toast.error(state.error);
      })
      .addCase(popularBussiness.pending, (state) => {
        state.loading = true;
        state.loading2 = true;
      })
      .addCase(popularBussiness.fulfilled, (state, action) => {
        state.loading = false;
        state.loading2 = false;
        state.updateBussiness = action.payload;
        state.message = action.payload.message;
        toast.success(action.payload.message);
      })
      .addCase(popularBussiness.rejected, (state, action) => {
        state.loading = false;
        state.loading2 = false;
        state.error = action.error.message;
        toast.error(state.error);
      });
  },
});

export default businessSlice.reducer;
