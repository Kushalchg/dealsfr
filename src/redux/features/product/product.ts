import api from "@/lib/interceptor";
import { FilterProductResponse, ProductItem } from "@/redux/features/product/types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { GetProductResponse } from "./types";

export const getProduct = createAsyncThunk<
  GetProductResponse,
  number,
  { rejectValue: string }
>("product/get", async (page, thunkAPI) => {
  try {
    const response = await api.get(`/api/items/?page=${page}`, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || error.message || "Registration failed"
    );
  }
});

export const searchProduct = createAsyncThunk<
  FilterProductResponse,
  string,
  { rejectValue: string }
>
  ("product/search", async (value, thunkAPI) => {
    try {
      const response = await api.get(`/api/items/search_all/?name=${value}`)
      return response.data;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(
        e.response?.data?.message || e.message || "search failed"
      )
    };
  })


export const createProduct = createAsyncThunk<
  AxiosResponse<ProductItem>,
  FormData,
  { rejectValue: string }
>("product/create", async (userData, thunkAPI) => {
  try {
    const response = await api.post("/api/products/", userData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || error.message || "Registration failed"
    );
  }
});
