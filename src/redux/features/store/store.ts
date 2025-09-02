import api from "@/lib/interceptor";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { BranchItem, CreateStoreBranchPayload, GetStoreDetailResponse, GetStoreListResponse } from "./types";

export const getStoreList = createAsyncThunk<
  GetStoreListResponse,
  void,
  { rejectValue: string }
>("storeList/get", async (_, thunkAPI) => {
  try {
    const response = await api.get(`/api/stores/`);
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || error.message || "Failed to get the store list data"
    );
  }
});


export const getStoreDetail = createAsyncThunk<
  GetStoreDetailResponse,
  number,
  { rejectValue: string }
>("storeDetail/get", async (id, thunkAPI) => {
  try {
    const response = await api.get(`/api/stores/${id}/`);
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || error.message || "Failed to get the store details"
    );
  }
});

export const getBranchesList = createAsyncThunk<
  BranchItem[],
  number,
  { rejectValue: string }
>("storeDetail/get/branches", async (id, thunkAPI) => {
  try {
    const response = await api.get(`/api/stores/${id}/branches/`);
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || error.message || "Failed to get the store branches"
    );
  }
});

export const createStoreBranch = createAsyncThunk<
  BranchItem,
  {
    payload: CreateStoreBranchPayload,
    id: number,
    action: string
    branch_id: number
  },
  { rejectValue: string }
>("storeDetail/create/branch", async ({ payload, id, action, branch_id }, thunkAPI) => {
  try {
    let response;
    if (action === 'edit') {
      response = await api.patch(`/api/stores/${id}/branches/${branch_id}/`, payload);
    } else {
      response = await api.post(`/api/stores/${id}/branches/`, payload);
    }

    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || error.message || "Failed to get the store branches"
    );
  }
});

export const getBranchDetails = createAsyncThunk<
  BranchItem,
  { branch_id: number, store_id: number },
  { rejectValue: string }
>("storeDetail/get/branch/Details", async ({ branch_id, store_id }, thunkAPI) => {
  try {
    const response = await api.get(`/api/stores/${store_id}/branches/${branch_id}/`);
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || error.message || "Failed to get the store branches"
    );
  }
});

