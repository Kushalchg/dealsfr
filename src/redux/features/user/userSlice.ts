import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loginUser, logoutUser, registerUser } from "./user";
import { getUser } from "./user";
import { GetUserResponse, UserLoginResponse } from "./types";
import { AxiosResponse } from "axios";

interface UserSliceInitialState {
  userStateLoading: boolean;

  userLoginData: UserLoginResponse | null;
  userLoginError: string | null;
  isAuthenticated: boolean;

  userRegisterData: { message: string } | null;
  userRegisterError: string | null;

  userLogoutError: string | null;

  getUserData: GetUserResponse | null;
  getUserError: string | null;
}

const initialState: UserSliceInitialState = {
  userStateLoading: false,

  userLoginData: null,
  userLoginError: null,
  isAuthenticated: false,

  userRegisterData: null,
  userRegisterError: null,

  userLogoutError: null,

  getUserData: null,
  getUserError: null,
};

const userSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    resetAllUserState: () => initialState,
    resetRegisterState: (state) => {
      state.userRegisterData = null;
      state.userRegisterError = null;
    },
    resetLoginState: (state) => {
      state.userLoginData = null;
      state.userLoginError = null;
      state.isAuthenticated = false;
    },
    resetLogoutState: (state) => {
      state.userLogoutError = null;
    },
    resetGetUserInfoState: (state) => {
      state.getUserData = null;
      state.getUserError = null;
    },
  },
  extraReducers(builder) {
    builder
      // Register
      .addCase(registerUser.pending, (state) => {
        state.userStateLoading = true;
        state.userRegisterError = null;
      })
      .addCase(registerUser.fulfilled,
        (state, action: PayloadAction<{ message: string }>) => {
          state.userStateLoading = false;
          state.userRegisterData = action.payload;
        }
      )
      .addCase(registerUser.rejected, (state, action) => {
        state.userStateLoading = false;
        state.userRegisterError = (action.payload as string) || "Registration failed";
      })

      // Login
      .addCase(loginUser.pending, (state) => {
        state.userStateLoading = true;
        state.userLoginError = null;
      })
      .addCase(loginUser.fulfilled,
        (state, action: PayloadAction<UserLoginResponse>) => {
          state.userStateLoading = false;
          state.userLoginData = action.payload;
          state.isAuthenticated = true;
        }
      )
      .addCase(loginUser.rejected, (state, action) => {
        state.userStateLoading = false;
        state.userLoginError = (action.payload as string) || "Login failed";
      })

      // Logout
      .addCase(logoutUser.pending, (state) => {
        state.userStateLoading = true;
        state.userLogoutError = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.userStateLoading = false;
        state.userLoginData = null;
        state.userRegisterData = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.userStateLoading = false;
        state.userLogoutError = (action.payload as string) || "Logout failed";
      })

      // Get User
      .addCase(getUser.pending, (state) => {
        state.userStateLoading = true;
        state.getUserError = null;
      })
      .addCase(getUser.fulfilled,
        (state, action: PayloadAction<GetUserResponse>) => {
          state.userStateLoading = false;
          state.getUserData = action.payload;
        }
      )
      .addCase(getUser.rejected, (state, action) => {
        state.userStateLoading = false;
        state.getUserError = (action.payload as string) || "Failed to fetch user data";
      });
  },
});

export const {
  resetAllUserState,
  resetRegisterState,
  resetLoginState,
  resetLogoutState,
  resetGetUserInfoState,
} = userSlice.actions;

export default userSlice.reducer;
