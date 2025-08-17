import {
  createDiscount,
  getDiscount,
} from "@/redux/features/discount/discount";
import {
  CreateDiscountResponse,
  DiscountItem,
} from "@/redux/features/discount/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DiscountState {
  discountData: DiscountItem[] | null;
  discountLoading: boolean;
  discountError: string | null;

  //create discount
  createDiscountData: CreateDiscountResponse | null;
  createDiscountLoading: boolean;
}

// Initial state
const initialState: DiscountState = {
  discountData: null,
  discountLoading: false,
  discountError: null,

  createDiscountData: null,
  createDiscountLoading: false,
};

const discountSlice = createSlice({
  name: "discount",
  initialState,
  reducers: {
    clearDiscountState(state) {
      state.discountError = null;
      state.discountData = null;
      state.discountLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
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
      //reducers for creating new disocunts
      .addCase(createDiscount.pending, (state) => {
        state.createDiscountLoading = true;
        state.discountError = null;
      })
      .addCase(createDiscount.fulfilled, (state, action: any) => {
        state.createDiscountLoading = false;
        state.createDiscountData = action.payload;
        state.discountError = null;
      })
      .addCase(
        createDiscount.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.createDiscountData = null;
          state.createDiscountLoading = false;
          state.discountError = action.payload || "Failed to fetch discounts";
        }
      );
  },
});

export const { clearDiscountState } = discountSlice.actions;
export default discountSlice.reducer;
