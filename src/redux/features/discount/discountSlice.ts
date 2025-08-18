import {
  createDiscount,
  getDiscount,
  updateDiscount,
  deleteDiscount,
} from "@/redux/features/discount/discount";
import {
  DiscountItem,
  GetDiscountResponse,
} from "@/redux/features/discount/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";

interface DiscountState {
  discountData: GetDiscountResponse | null;
  discountLoading: boolean;
  discountError: string | null;

  //create discount
  createDiscountData: AxiosResponse<DiscountItem> | null;
  createDiscountLoading: boolean;

  //update discount
  updateDiscountData: AxiosResponse<DiscountItem> | null;
  updateDiscountLoading: boolean;

  //delete discount
  deleteDiscountData: AxiosResponse<{ message: string }> | null;
  deleteDiscountLoading: boolean;
}

// Initial state
const initialState: DiscountState = {
  //Get Discount
  discountData: null,
  discountLoading: false,
  discountError: null,

  //create discount
  createDiscountData: null,
  createDiscountLoading: false,

  //update discount
  updateDiscountData: null,
  updateDiscountLoading: false,

  //delete discount
  deleteDiscountData: null,
  deleteDiscountLoading: false,
};

const discountSlice = createSlice({
  name: "discount",
  initialState,
  reducers: {
    clearAllDiscountState: (state) => {
      state.discountError = null;
      state.discountData = null;
      state.discountLoading = false;
      state.createDiscountData = null;
      state.createDiscountLoading = false;
      state.updateDiscountData = null;
      state.updateDiscountLoading = false;
      state.deleteDiscountData = null;
      state.deleteDiscountLoading = false;
    },
    clearGetDiscountState: (state) => {
      state.discountError = null;
      state.discountData = null;
      state.discountLoading = false;
    },
    clearCreateDiscountState: (state) => {
      state.discountError = null;
      state.createDiscountData = null;
      state.createDiscountLoading = false;
    },
    clearUpdateDiscountState: (state) => {
      state.discountError = null;
      state.updateDiscountData = null;
      state.updateDiscountLoading = false;
    },
    clearDeleteDiscountState: (state) => {
      state.discountError = null;
      state.deleteDiscountData = null;
      state.deleteDiscountLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get Discount
      .addCase(getDiscount.pending, (state) => {
        state.discountLoading = true;
        state.discountError = null;
      })
      .addCase(getDiscount.fulfilled, (state, action: any) => {
        state.discountLoading = false;
        state.discountData = action.payload;
        state.discountError = null;
      })
      .addCase(
        getDiscount.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.discountData = null;
          state.discountLoading = false;
          state.discountError = action.payload || "Failed to fetch discounts";
        }
      )

      // Create Discount
      .addCase(createDiscount.pending, (state) => {
        state.createDiscountLoading = true;
        state.discountError = null;
      })
      .addCase(createDiscount.fulfilled, (state, action) => {
        state.createDiscountLoading = false;
        state.createDiscountData = action.payload;
        state.discountError = null;
      })
      .addCase(
        createDiscount.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.createDiscountData = null;
          state.createDiscountLoading = false;
          state.discountError = action.payload || "Failed to create discount";
        }
      )

      // Update Discount
      .addCase(updateDiscount.pending, (state) => {
        state.updateDiscountLoading = true;
        state.discountError = null;
      })
      .addCase(updateDiscount.fulfilled, (state, action) => {
        state.updateDiscountLoading = false;
        state.updateDiscountData = action.payload;
        state.discountError = null;
      })
      .addCase(
        updateDiscount.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.updateDiscountData = null;
          state.updateDiscountLoading = false;
          state.discountError = action.payload || "Failed to update discount";
        }
      )

      // Delete Discount
      .addCase(deleteDiscount.pending, (state) => {
        state.deleteDiscountLoading = true;
        state.discountError = null;
      })
      .addCase(deleteDiscount.fulfilled, (state, action) => {
        state.deleteDiscountLoading = false;
        state.deleteDiscountData = action.payload;
        state.discountError = null;
      })
      .addCase(
        deleteDiscount.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.deleteDiscountData = null;
          state.deleteDiscountLoading = false;
          state.discountError = action.payload || "Failed to delete discount";
        }
      );
  },
});

export const {
  clearAllDiscountState,
  clearCreateDiscountState,
  clearDeleteDiscountState,
  clearGetDiscountState,
  clearUpdateDiscountState
} = discountSlice.actions;

export default discountSlice.reducer;
