import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DiscountItem } from "@/model/discount";
import { getDiscount } from "@/redux/actions/discount";

interface DiscountState {
  discountData: DiscountItem[] | null;
  discountLoading: boolean;
  discountError: string | null;
}

// Initial state
const initialState: DiscountState = {
  discountData: null,
  discountLoading: false,
  discountError: null,
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
      );
  },
});

export const { clearDiscountState } = discountSlice.actions;
export default discountSlice.reducer;
