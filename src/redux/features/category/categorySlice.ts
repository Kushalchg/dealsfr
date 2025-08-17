import {
  getMainCategory,
  getSubCategory,
} from "@/redux/features/category/category";
import {
  MainCategoryItem,
  SubCategoryItem,
} from "@/redux/features/category/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CategoryState {
  mainCategoryData: MainCategoryItem[] | null;
  subCategoryData: SubCategoryItem[] | null;
  categoryLoading: boolean;
  categoryError: string | null;
}

// Initial state
const initialState: CategoryState = {
  mainCategoryData: null,
  subCategoryData: null,
  categoryLoading: false,
  categoryError: null,
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    clearCategoryState(state) {
      state.mainCategoryData = null;
      state.subCategoryData = null;
      state.categoryLoading = false;
      state.categoryError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Main Category Cases
      .addCase(getMainCategory.pending, (state) => {
        state.categoryLoading = true;
        state.categoryError = null;
      })
      .addCase(getMainCategory.fulfilled, (state, action: any) => {
        state.categoryLoading = false;
        state.mainCategoryData = action.payload;
        state.categoryError = null;
      })
      .addCase(
        getMainCategory.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.mainCategoryData = null;
          state.categoryLoading = false;
          state.categoryError =
            action.payload || "Failed to fetch main categories";
        }
      )
      // Sub Category Cases
      .addCase(getSubCategory.pending, (state) => {
        state.categoryLoading = true;
        state.categoryError = null;
      })
      .addCase(getSubCategory.fulfilled, (state, action: any) => {
        state.categoryLoading = false;
        state.subCategoryData = action.payload;
        state.categoryError = null;
      })
      .addCase(
        getSubCategory.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.subCategoryData = null;
          state.categoryLoading = false;
          state.categoryError =
            action.payload || "Failed to fetch sub categories";
        }
      );
  },
});

export const { clearCategoryState } = categorySlice.actions;
export default categorySlice.reducer;
