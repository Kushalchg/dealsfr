import { createAsyncThunk } from "@reduxjs/toolkit";
import { GetUserResponse } from "./types";
import api from "@/lib/interceptor";

export const getUser = createAsyncThunk<
  GetUserResponse,
  void,
  { rejectValue: string }>(
    "user/getUser",
    async (_, thunkAPI) => {
      try {
        const response = await api.get("/api/me/", {
          headers: { "Content-Type": "application/json" },
        });

        return response.data;
      } catch (error: any) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.message ||
          error.message ||
          "Error while getting user detial"
        );
      }
    }
  );
