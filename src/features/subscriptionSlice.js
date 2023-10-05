import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    subscribers: [],
    status: null,
    loading: true,
    error:"",
    
}

export const subscribeUser = createAsyncThunk("subscribeUser", async (user,{rejectWithValue}) => {
     
    try {
        const response = await axios.post(`${import.meta.env.VITE_SERVER_DOMAIN}/api/subscription`, {
            email:user.email
        })
        return response?.data
     
    } catch (error) {
        console.log(error.response.data);
        return rejectWithValue(error.response.data);
    }
    
})

const subscriptionSlice = createSlice({
    name: "subscription",
    initialState,
    reducers: {
        
    },
    extraReducers: (builder) => {
        builder.addCase(subscribeUser.pending, (state) => {
            state.status = "pending";
            state.loading=true
        }).addCase(subscribeUser.fulfilled, (state, action) => {
            state.status = "fulfilled";
            state.subscribers = action.payload;
            state.loading = false
        }).addCase(subscribeUser.rejected, (state,action) => {
            state.status = "rejected";
            state.loading = false;
            state.error = action.payload;
        })
        }
    
})

export default subscriptionSlice.reducer;
