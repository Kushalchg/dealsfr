import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BannerItem } from "@/model/banner";
import { getBanner } from "@/redux/actions/banner";
interface BannerState {
  bannerData: BannerItem[] | null;
  bannerLoading: boolean;
  bannerError: string | null;
}

// Initial state
const initialState: BannerState = {
  bannerData: null,
  bannerLoading: false,
  bannerError: null,
};

const bannerSlice = createSlice({
  name: "banner",
  initialState,
  reducers: {
    clearBannerState(state) {
      state.bannerError = null;
      state.bannerData = null;
      state.bannerLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBanner.pending, (state) => {
        state.bannerLoading = true;
        state.bannerError = null;
      })
      .addCase(getBanner.fulfilled, (state, action: any) => {
        state.bannerLoading = false;
        state.bannerData = action.payload;
        state.bannerError = null;
      })
      .addCase(
        getBanner.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.bannerData = null;
          state.bannerLoading = false;

          state.bannerError = action.payload || "Failed to fetch banners";
        }
      );
  },
});

export const { clearBannerState } = bannerSlice.actions;
export default bannerSlice.reducer;
