
import api from "@/lib/interceptor";
import { LayoutItem } from "@/model/layoutPreview";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";

export const getLayout = createAsyncThunk<
  AxiosResponse<LayoutItem[]>,
  void,
  { rejectValue: string }
>("userData/layout/get", async (_, thunkAPI) => {
  try {
    const response = await api.get("/api/layouts/");
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || error.message || "Registration failed"
    );
  }
});

// export const createLayout = createAsyncThunk<
//   AxiosResponse<LayoutItem>,
//   LayoutFormData,
//   { rejectValue: string }
// >("userData/discount/get", async (discountData, thunkAPI) => {
//   try {
//     const response = await api.post("/api/discounts/", discountData);
//     return response.data;
//   } catch (error: any) {
//     return thunkAPI.rejectWithValue(
//       error.response?.data?.message || error.message || "Registration failed"
//     );
//   }
// });
