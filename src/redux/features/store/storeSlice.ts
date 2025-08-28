import { GetStoreDetailResponse, StoreItem } from "./types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getStoreDetail, getStoreList } from "./store";

interface StoreState {
  storeStateLoading: boolean;

  //getting the list of store (probably useful for customer)
  storeListData: StoreItem[] | null;
  storeListError: string | null;

  //getting the detail of specific store (for store admin) 
  storeDetailData: GetStoreDetailResponse | null;
  storeDetailError: string | null;

}

// Initial state
const initialState: StoreState = {
  storeStateLoading: false,

  storeListData: null,
  storeListError: null,


  storeDetailData: null,
  storeDetailError: null,

};


const storeSlice = createSlice({
  name: "store",
  initialState,
  reducers: {
    clearStoreState(state) {
      state.storeListError = null;
      state.storeListData = null;
      state.storeStateLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      //to get the list of store this is only applicable for customer side
      .addCase(getStoreList.pending, (state) => {
        state.storeStateLoading = true;
        state.storeListError = null;
      })
      .addCase(getStoreList.fulfilled, (state, action) => {
        state.storeStateLoading = false;
        state.storeListData = action.payload.results;
        state.storeListError = null;
      })
      .addCase(
        getStoreList.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.storeListData = null;
          state.storeStateLoading = false;

          state.storeListError = action.payload || "Failed to fetch store";
        }
      )
      //for getting the detail of the store by store admin
      .addCase(getStoreDetail.pending, (state) => {
        state.storeStateLoading = true;
        state.storeDetailError = null;
      })
      .addCase(getStoreDetail.fulfilled, (state, action: PayloadAction<GetStoreDetailResponse>) => {
        state.storeStateLoading = false;
        state.storeDetailData = action.payload;
        state.storeDetailError = null;
      })
      .addCase(
        getStoreDetail.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.storeDetailData = null;
          state.storeStateLoading = false;
          state.storeDetailError = action.payload || "Failed to fetch store";
        }
      )

  },
});

export const { clearStoreState } = storeSlice.actions;
export default storeSlice.reducer;
