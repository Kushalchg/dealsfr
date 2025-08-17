import { DiscountFormData } from "@/app/dashboard/discounts/add/page";
import api from "@/lib/interceptor";
import {
  CreateDiscountResponse,
  DiscountItem,
} from "@/redux/features/discount/types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";

export const getDiscount = createAsyncThunk<
  AxiosResponse<DiscountItem[]>,
  void,
  { rejectValue: string }
>("userData/discount/get", async (_, thunkAPI) => {
  try {
    const response = await api.get("/api/discounts/");
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message ||
        error.message ||
        "Failed to get discounts."
    );
  }
});

export const createDiscount = createAsyncThunk<
  AxiosResponse<CreateDiscountResponse>,
  DiscountFormData,
  { rejectValue: string }
>("userData/discount/create", async (discountData, thunkAPI) => {
  try {
    const response = await api.post("/api/discounts/", {
      ...discountData,
      main_category: 1,
    });
    return response;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message ||
        error.message ||
        "Failed to create discount."
    );
  }
});

export const updateDiscount = createAsyncThunk<
  AxiosResponse<CreateDiscountResponse>,
  DiscountFormData,
  { rejectValue: string }
>("userData/discount/update", async (discountData, thunkAPI) => {
  try {
    const response = await api.patch("/api/discounts/", {
      ...discountData,
    });
    return response;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message ||
        error.message ||
        "Failed to update discount."
    );
  }
});

export const deleteDiscount = createAsyncThunk<
  AxiosResponse<CreateDiscountResponse>,
  DiscountFormData,
  { rejectValue: string }
>("userData/discount/delete", async (id, thunkAPI) => {
  try {
    const response = await api.delete(`/api/discounts/${id}`);
    return response;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message ||
        error.message ||
        "Failed to delete discount."
    );
  }
});
