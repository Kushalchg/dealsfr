import api from "@/lib/interceptor";
import { BannerItem } from "@/redux/features/banner/types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";

export const getBanner = createAsyncThunk<
  BannerItem[],
  number,
  { rejectValue: string }
>("userData/banner/get", async (store_id, thunkAPI) => {
  try {
    const response = await api.get(`/api/stores/${store_id}/banners/`, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || error.message || "Registration failed"
    );
  }
});

export const createBanner = createAsyncThunk<
  AxiosResponse<BannerItem>,
  FormData,
  { rejectValue: string }
>("userData/banner/create", async (userData, thunkAPI) => {
  try {
    const response = await api.post("/api/banners/", userData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || error.message || "Registration failed"
    );
  }
});
