import { createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
    productList: [],
    isLoading: true,
    error: null,
    Status:null
}

export const productFetch = createAsyncThunk("auth/productfetch", async () => {
   
        const response = await axios.get(`${import.meta.env.VITE_SERVER_DOMAIN}/product`);
        return response?.data
});



    
const productSlice =createSlice( {
    name: "products",
    initialState,
    reducers: {
        
    },
    extraReducers: (builder) => {
        builder.addCase(productFetch.pending,(state) => {
            state.isLoading = true;
            state.Status="pending"
        }).addCase(productFetch.fulfilled, (state, action) => {
            state.isLoading = false;
            state.productList = action.payload;
            state.Status="success"
                
        }).addCase(productFetch.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload
            state.Status="rejected"
        })
    }
})

export default productSlice.reducer;
