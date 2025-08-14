import { DiscountFormData } from "@/app/dashboard/discounts/add/page";
import api from "@/lib/interceptor";
import { DiscountItem } from "@/model/discount";
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
      error.response?.data?.message || error.message || "Registration failed"
    );
  }
});

export const createDiscount = createAsyncThunk<
  AxiosResponse<DiscountItem>,
  DiscountFormData,
  { rejectValue: string }
>("userData/discount/get", async (discountData, thunkAPI) => {
  try {
    const response = await api.post("/api/discounts/", discountData);
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || error.message || "Registration failed"
    );
  }
});
