import api from "@/lib/interceptor";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { GetStoreDetailResponse, GetStoreListResponse } from "./types";

export const getStoreList = createAsyncThunk<
  GetStoreListResponse,
  void,
  { rejectValue: string }
>("storeList/get", async (_, thunkAPI) => {
  try {
    const response = await api.get(`/api/stores`);
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || error.message || "Failed to get the store list data"
    );
  }
});


export const getStoreDetail = createAsyncThunk<
  GetStoreDetailResponse,
  number,
  { rejectValue: string }
>("storeDetail/get", async (id, thunkAPI) => {
  try {
    const response = await api.get(`/api/stores/${id}/`);
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || error.message || "Failed to get the store details"
    );
  }
});

