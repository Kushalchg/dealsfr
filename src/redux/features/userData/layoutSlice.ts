import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LayoutItem } from "@/model/layoutPreview";
import { getLayout } from "@/redux/actions/layout";

interface LayoutState {
  layoutData: LayoutItem[] | null;
  layoutLoading: boolean;
  layoutError: string | null;
}

// Initial state
const initialState: LayoutState = {
  layoutData: null,
  layoutLoading: false,
  layoutError: null,
};

const layoutSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {
    clearLayoutState(state) {
      state.layoutError = null;
      state.layoutData = null;
      state.layoutLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLayout.pending, (state) => {
        state.layoutLoading = true;
        state.layoutError = null;
      })
      .addCase(getLayout.fulfilled, (state, action: any) => {
        state.layoutLoading = false;
        state.layoutData = action.payload;
        state.layoutError = null;
      })
      .addCase(
        getLayout.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.layoutData = null;
          state.layoutLoading = false;

          state.layoutError = action.payload || "Failed to fetch layout";
        }
      );
  },
});

export const { clearLayoutState } = layoutSlice.actions;
export default layoutSlice.reducer;
