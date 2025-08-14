import api from "@/lib/interceptor";
import { BannerItem } from "@/model/banner";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";

export const getBanner = createAsyncThunk<
  AxiosResponse<BannerItem[]>,
  void,
  { rejectValue: string }
>("userData/banner/get", async (_, thunkAPI) => {
  try {
    const response = await api.get("/api/banners/", {
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
