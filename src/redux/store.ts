import bannerReducer from "./features/userData/bannerSlice";
import layoutReducer from "./features/userData/layoutSlice"
import discountReducer from "./features/userData/discountSlice"
import userReducer from "./features/userData/userSlice";
import { configureStore } from "@reduxjs/toolkit";

export const makeStore = () => {
  return configureStore({
    reducer: {
      userData: userReducer,
      banner: bannerReducer,
      discount: discountReducer,
      layout: layoutReducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
