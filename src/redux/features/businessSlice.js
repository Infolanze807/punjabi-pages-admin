import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosConfig from "../axiosConfig";

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

// Slice
const businessSlice = createSlice({
  name: "business",
  initialState: {
    BusinessCategory: [],
    loading: false,
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
      });
  },
});

export default businessSlice.reducer;
