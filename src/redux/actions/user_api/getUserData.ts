import { createAsyncThunk } from "@reduxjs/toolkit"
import { MeApiResponse } from  "../../../model/meApiResponse";
import { fetchWithAuth } from "../../../lib/auth";

export const getUser = createAsyncThunk<
    MeApiResponse,
    void,
    { rejectValue: string }
    >
    ("userData/me", async(_, thunkAPI) => {
            try{
                const response = await fetchWithAuth<MeApiResponse>("/api/me/");
                return response;
            }
            catch (error: any) {
                return thunkAPI.rejectWithValue(
                error.response?.data?.message || error.message || "Failed to fetch user data"
                )
            }
        }
    )