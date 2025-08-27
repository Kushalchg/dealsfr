import { StoreItem } from "./types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getStore } from "./store";

interface StoreState {
  storeData: StoreItem[] | null;
  storeLoading: boolean;
  storeError: string | null;

}

// Initial state
const initialState: StoreState = {
  storeData: null,
  storeLoading: false,
  storeError: null,

};


const storeSlice = createSlice({
  name: "store",
  initialState,
  reducers: {
    clearStoreState(state) {
      state.storeError = null;
      state.storeData = null;
      state.storeLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getStore.pending, (state) => {
        state.storeLoading = true;
        state.storeError = null;
      })
      .addCase(getStore.fulfilled, (state, action) => {
        state.storeLoading = false;
        state.storeData = action.payload.results;
        state.storeError = null;
      })
      .addCase(
        getStore.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.storeData = null;
          state.storeLoading = false;

          state.storeError = action.payload || "Failed to fetch store";
        }
      )

  },
});

export const { clearStoreState } = storeSlice.actions;
export default storeSlice.reducer;
