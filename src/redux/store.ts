import { configureStore } from "@reduxjs/toolkit";
import bannerReducer from "./features/banner/bannerSlice";
import discountReducer from "./features/discount/discountSlice";
import layoutReducer from "./features/layout/layoutSlice";
import userReducer from "./features/user/userSlice";

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
