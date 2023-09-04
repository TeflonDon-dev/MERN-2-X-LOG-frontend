import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer, { loadUser } from "../features/authSlice";
import productSliceReducer from "../features/productSlice"; 
import { productFetch } from "../features/productSlice";
import cartSliceReducer from "../features/cartSlice";
import { calculateTotals } from "../features/cartSlice";
import modalSliceReducer from "../features/modalSlice";
import subscriptionSliceReducer from "../features/subscriptionSlice";


const store = configureStore({
    reducer: {
        auth: authSliceReducer,
        products: productSliceReducer,
        cart: cartSliceReducer,
        modal: modalSliceReducer,
        subscription:subscriptionSliceReducer

    }
});

export default store;

store.dispatch(productFetch())
store.dispatch(calculateTotals());
store.dispatch(loadUser())

