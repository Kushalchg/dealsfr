import api from "@/lib/interceptor";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { BranchItem, CreateStoreBranchPayload, DocumentItem, GetStoreDetailResponse, GetStoreListResponse, SocialMedia, StoreItem } from "./types";

// =============================================
// STORE
// =============================================

export const createStore = createAsyncThunk<
  GetStoreDetailResponse,
  FormData,
  { rejectValue: string }
>("storeDetail/create", async (formData, thunkAPI) => {
  try {
    const response = await api.post(`/api/stores/`, formData,
      {
        headers: {
          "Content-Type": "multipart/form-data"
        },
      }
    );
    return response.data
  } catch (error: any) {
    console.log(error)
    return thunkAPI.rejectWithValue(
      error.response?.data.message || error.message || "Failed to create the store"
    );
  }
});

export const updateStore = createAsyncThunk<
  GetStoreDetailResponse,
  { payload: FormData, id: number },
  { rejectValue: string }
>("storeDetail/update", async ({ payload, id }, thunkAPI) => {
  try {
    const response = await api.patch(`/api/stores/${id}/`, payload,
      {

        headers: {
          "Content-Type": "multipart/form-data"
        }
      }
    );
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || error.message || "Failed to create the store"
    );
  }
});


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


//************************************************
// BRANCH
//************************************************

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

//****************************************************
// Store Documents 
//****************************************************

export const getStoreDocumentsList = createAsyncThunk<
  DocumentItem[],
  number,
  { rejectValue: string }
>('store/get/documents-list', async (s_id, thunkAPI) => {
  try {
    const response = await api.get(`/api/stores/${s_id}/documents/`)
    return response.data
  } catch (err: any) {

    thunkAPI.rejectWithValue(
      err.response?.data?.message || err.message || "Failed to get the store documents list"
    )
  }
})

export const createStoreDocuments = createAsyncThunk<
  DocumentItem,
  { payload: FormData, s_id: number },
  { rejectValue: string }
>('store/create/documents', async ({ payload, s_id }, thunkAPI) => {
  try {
    const response = await api.post(`/api/stores/${s_id}/documents/`, payload)
    return response.data
  } catch (err: any) {
    thunkAPI.rejectWithValue(
      err.response?.data?.message || err.message || "Failed to create the store documents"
    )
  }
})

//##################################################
// Social Media 
//##################################################

export const getSocialMediaList = createAsyncThunk<
  SocialMedia[],
  number,
  { rejectValue: string }
>("storeDetail/get/social-media-list", async (s_id, thunkAPI) => {
  try {
    const response = await api.get(`/api/stores/${s_id}/social-media/`);
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || error.message || "Failed to get social media list"
    );
  }
});

export const createSocialMedia = createAsyncThunk<
  SocialMedia,
  { payload: SocialMedia, s_id: number },
  { rejectValue: string }
>("storeDetail/create/social-media", async ({ payload, s_id }, thunkAPI) => {
  try {
    const response = await api.post(`/api/stores/${s_id}/social-media/`, payload);
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || error.message || "Failed to create social media item"
    );
  }
});

