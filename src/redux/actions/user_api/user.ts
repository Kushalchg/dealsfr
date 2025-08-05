import api from "../../../lib/axios"; 
import { createAsyncThunk } from "@reduxjs/toolkit";
import { SetUserData, GetUserData, UserLoginResponse, UserLoginRequest } from "../../../model/userData";

export const registerUser = createAsyncThunk<
  GetUserData,
  SetUserData,
  { rejectValue: string }
>("userData/registerUser", async (userData, thunkAPI) => {
  try {
    const response = await api.post("/api/accounts/register/", userData, {
      headers: { "Content-Type": "application/json" },
    });

    return response.data; // assuming API returns user info
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || error.message || "Registration failed"
    );
  }
});

export const loginUser = createAsyncThunk<
 UserLoginResponse,
 UserLoginRequest,
  { rejectValue: string }
>("userData/loginUser", async (loginData, thunkAPI) => {
  try {
    const response = await api.post("/api/accounts/login/", loginData, {
      headers: { "Content-Type": "application/json" },
    });

    // Save tokens
    if (typeof window !== "undefined") {
      localStorage.setItem("access_token", response.data.data.access);
      localStorage.setItem("refresh_token", response.data.data.refresh);
    }

    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || error.message || "Login failed"
    );
  }
});


export const logoutUser = createAsyncThunk<
  void,
  void,
  { rejectValue: string }
>("userData/logoutUser", async (_, thunkAPI) => {
  try {
    const refreshToken = localStorage.getItem("refresh_token");

    if (!refreshToken) {
      throw new Error("Login Error!");
    }

    await api.post("/api/accounts/logout/", { refresh: refreshToken }, {
      headers: { "Content-Type": "application/json" },
    });

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
});
