import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loginUser, registerUser, logoutUser } from "../../actions/user_api/user";
import { getUser } from "../../actions/user_api/getUserData";
import { UserState } from "../../../model/userState";
import { GetUserData } from "../../../model/userData";
import { MeApiResponse } from "../../../model/meApiResponse";


const initialState: UserState = {
  user: null,
  store: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    "resetUserState": (state) => {
      state.user = null;
      state.store = null,
      state.loading = false;
      state.error = null;
    }
  },
  extraReducers(builder) {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        loginUser.fulfilled,
        (state, action: PayloadAction<{ access: string; refresh: string }>) => {
          state.loading = false;
          state.accessToken = action.payload.access;
          state.refreshToken = action.payload.refresh;
          state.isAuthenticated = true;
        }
      )
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Login failed";
      })

      // Register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<GetUserData>) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Registration failed";
      })

      // Logout
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.accessToken = null;
        state.refreshToken = null;
        state.isAuthenticated = false;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Logout failed";
      })


      // meResponse
      .addCase(getUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(
        getUser.fulfilled,
        (state, action: PayloadAction<MeApiResponse>) => {
          state.loading = false
          const { store, ...userData } = action.payload
          state.user = userData
          state.store = store || null
          state.isAuthenticated = true
        }
      )
      .addCase(getUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || "Failed to fetch user data"
        state.isAuthenticated = false
      })
  },
});

export const { resetUserState } = userSlice.actions;
export default userSlice.reducer;
