import { BranchItem, GetStoreDetailResponse, StoreItem } from "./types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  createStore, createStoreBranch, getBranchDetails,
  getBranchesList, getStoreDetail, getStoreList,
  updateStore
} from "./store";

interface StoreInitialState {
  storeStateLoading: boolean;
  branchStateLoading: boolean;

  //getting the list of store (probably useful for customer)
  storeListData: StoreItem[] | null;
  storeListError: string | null;

  //for registering new store(can careate only one store)
  storeCreateData: GetStoreDetailResponse | null;
  storeCreateError: string | null;

  //creating store
  storeUpdateData: GetStoreDetailResponse | null;
  storeUpdateError: string | null;

  //getting the detail of specific store (for store admin) 
  storeDetailData: GetStoreDetailResponse | null;
  storeDetailError: string | null;

  branchesData: BranchItem[] | null;
  branchesError: string | null;

  creteBranchData: BranchItem | null;
  createBranchError: string | null;

  branchDetailsData: BranchItem | null;
  branchDetailsError: string | null,

}

// Initial state
const initialState: StoreInitialState = {
  storeStateLoading: false,
  branchStateLoading: false,

  //for list of stores(useful for customer)
  storeListData: null,
  storeListError: null,

  //create store
  storeCreateData: null,
  storeCreateError: null,

  //update store
  storeUpdateData: null,
  storeUpdateError: null,

  //for detail info of specific branch 
  storeDetailData: null,
  storeDetailError: null,


  //for list of branches of specific store
  branchesData: null,
  branchesError: null,

  //for creating branch
  creteBranchData: null,
  createBranchError: null,
  //to get the detail of one branch

  branchDetailsData: null,
  branchDetailsError: null,
};


const storeSlice = createSlice({
  name: "store",
  initialState,
  reducers: {
    clearAllStoreState: () => initialState,
    clearStoreListState: (state) => {
      state.storeListData = null;
      state.storeListError = null;
    },

    clearStoreCreateState: (state) => {
      state.storeCreateData = null;
      state.storeCreateError = null;
    },

    clearStoreUpdateState: (state) => {
      state.storeUpdateData = null;
      state.storeUpdateError = null;
    },

    clearStoreDetailState: (state) => {
      state.storeDetailData = null;
      state.storeDetailError = null;
    },

    clearCreateBranchState: (state) => {
      state.creteBranchData = null;
      state.createBranchError = null;
    },

    clearBranchDetailsState: (state) => {
      state.branchDetailsData = null;
      state.branchDetailsError = null;
    }
  },
  extraReducers: (builder) => {
    builder
      //*************************************************************
      //for store
      //*************************************************************
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

      //creating store
      .addCase(createStore.pending, (state) => {
        state.storeStateLoading = true;
        state.storeCreateData = null;
      })
      .addCase(createStore.fulfilled, (state, action: PayloadAction<GetStoreDetailResponse>) => {
        state.storeStateLoading = false;
        state.storeCreateData = action.payload;
        state.storeDetailData = action.payload;
        state.storeCreateError = null;
      })
      .addCase(
        createStore.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.storeCreateData = null;
          state.storeStateLoading = false;
          state.storeCreateError = action.payload || "Failed to create store";
        }
      )
      //update store detail
      .addCase(updateStore.pending, (state) => {
        state.storeStateLoading = true;
        state.storeUpdateError = null;
      })
      .addCase(updateStore.fulfilled, (state, action: PayloadAction<GetStoreDetailResponse>) => {
        state.storeStateLoading = false;
        state.storeUpdateData = action.payload;
        state.storeDetailData = action.payload;
        state.storeUpdateError = null;
      })
      .addCase(
        updateStore.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.storeUpdateData = null;
          state.storeStateLoading = false;
          state.storeUpdateError = action.payload || "Failed to fetch store";
        }
      )

      //*************************************************************
      //for branches
      //*************************************************************
      //get the list of branches of specific store
      .addCase(getBranchesList.pending, (state) => {
        state.branchStateLoading = true;
        state.branchesError = null;
      })
      .addCase(getBranchesList.fulfilled, (state, action: PayloadAction<BranchItem[]>) => {
        state.branchStateLoading = false;
        state.branchesData = action.payload;
        state.branchesError = null;
      })
      .addCase(
        getBranchesList.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.branchesData = null;
          state.branchStateLoading = false;
          state.branchesError = action.payload || "Failed to fetch list of branches";
        }
      )

      //creating branches
      .addCase(createStoreBranch.pending, (state) => {
        state.branchStateLoading = true;
        state.createBranchError = null;
      })
      .addCase(createStoreBranch.fulfilled, (state, action: PayloadAction<BranchItem>) => {
        state.branchStateLoading = false;
        state.creteBranchData = action.payload;
        state.branchesError = null;
      })
      .addCase(
        createStoreBranch.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.creteBranchData = null;
          state.branchStateLoading = false;
          state.createBranchError = action.payload || "Failed to create branch";
        }
      )

      //getting branch details
      .addCase(getBranchDetails.pending, (state) => {
        state.branchStateLoading = true;
        state.branchDetailsError = null;
      })
      .addCase(getBranchDetails.fulfilled, (state, action: PayloadAction<BranchItem>) => {
        state.branchStateLoading = false;
        state.branchDetailsData = action.payload;
        state.branchDetailsError = null;
      })
      .addCase(
        getBranchDetails.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.branchDetailsData = null;
          state.branchStateLoading = false;
          state.branchDetailsError = action.payload || "Failed to fetch the detail of branches";
        }
      )
  },
});

export const {
  clearAllStoreState, clearStoreDetailState, clearStoreListState,
  clearCreateBranchState, clearBranchDetailsState, clearStoreUpdateState,
  clearStoreCreateState,
} = storeSlice.actions;
export default storeSlice.reducer;
