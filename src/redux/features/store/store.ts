import api from "@/lib/interceptor";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { GetStoreResponse } from "./types";

export const getStore = createAsyncThunk<
  GetStoreResponse,
  void,
  { rejectValue: string }
>("store/get", async (_, thunkAPI) => {
  try {
    const response = await api.get(`/api/stores`);
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || error.message || "Registration failed"
    );
  }
});

