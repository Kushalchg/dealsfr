import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import authApi from "@/lib/interceptor";
import api from "../../../lib/axios";
import { GetUserResponse, UserLoginPayload, UserLoginResponse, UserRegisterPayload } from "./types";

export const registerUser = createAsyncThunk<
  AxiosResponse<{ message: string }>,
  UserRegisterPayload,
  { rejectValue: string }
>("user/registerUser", async (userData, thunkAPI) => {
  try {

    const response = await api.post("/api/accounts/register/", userData, {
      headers: { "Content-Type": "application/json" },
    });

    return response;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || error.message || "Registration failed"
    );
  }
});

export const loginUser = createAsyncThunk<
  AxiosResponse<UserLoginResponse>,
  UserLoginPayload,
  { rejectValue: string }
>("user/loginUser", async (loginData, thunkAPI) => {
  try {
    const response = await api.post<UserLoginResponse>("/api/accounts/login/", loginData, {
      headers: { "Content-Type": "application/json" },
    });

    // Save tokens
    if (typeof window !== "undefined") {
      localStorage.setItem("access_token", response.data.data.access);
      localStorage.setItem("refresh_token", response.data.data.refresh);
    }

    return response;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || error.message || "Login failed"
    );
  }
});


export const logoutUser = createAsyncThunk<void, void, { rejectValue: string }>(
  "user/logoutUser",
  async (_, thunkAPI) => {
    try {
      const refreshToken = localStorage.getItem("refresh_token");

      if (!refreshToken) {
        throw new Error("Login Error!");
      }

      await api.post(
        "/api/accounts/logout/",
        { refresh: refreshToken },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      // Clear localStorage
      if (typeof window !== "undefined") {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
      }
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message || "Logout failed"
      );
    }
  }
);

export const getUser = createAsyncThunk<
  GetUserResponse,
  void,
  { rejectValue: string }>(
    "user/getUser",
    async (_, thunkAPI) => {
      try {
        const response = await authApi.get("/api/me/", {
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
