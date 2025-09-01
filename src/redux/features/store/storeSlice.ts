import { BranchItem, GetStoreDetailResponse, StoreItem } from "./types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getBranches, getStoreDetail, getStoreList } from "./store";

interface StoreInitialState {
  storeStateLoading: boolean;
  branchStateLoading: boolean;

  //getting the list of store (probably useful for customer)
  storeListData: StoreItem[] | null;
  storeListError: string | null;

  //getting the detail of specific store (for store admin) 
  storeDetailData: GetStoreDetailResponse | null;
  storeDetailError: string | null;

  branchesData: BranchItem[] | null;
  branchesError: string | null;

}

// Initial state
const initialState: StoreInitialState = {
  storeStateLoading: false,
  branchStateLoading: false,

  //for list of stores(useful for customer)
  storeListData: null,
  storeListError: null,


  //for detail info of specific branch 
  storeDetailData: null,
  storeDetailError: null,


  //for list of branches of specific store
  branchesData: null,
  branchesError: null,
};


const storeSlice = createSlice({
  name: "store",
  initialState,
  reducers: {
    clearStoreState: () => initialState,
    clearStoreListState: (state) => {
      state.storeListData = null;
      state.storeListError = null;
    },
    clearStoreDetailState: (state) => {
      state.storeDetailData = null;
      state.storeDetailError = null;
    }
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

      //for branches
      //get the list of branches of specific store
      .addCase(getBranches.pending, (state) => {
        state.branchStateLoading = true;
        state.branchesError = null;
      })
      .addCase(getBranches.fulfilled, (state, action: PayloadAction<BranchItem[]>) => {
        state.branchStateLoading = false;
        state.branchesData = action.payload;
        state.branchesError = null;
      })
      .addCase(
        getBranches.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.branchesData = null;
          state.branchStateLoading = false;
          state.branchesError = action.payload || "Failed to fetch list of branches";
        }
      )

  },
});

export const { clearStoreState, clearStoreDetailState, clearStoreListState } = storeSlice.actions;
export default storeSlice.reducer;
