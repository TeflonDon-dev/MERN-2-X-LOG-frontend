import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

const initialState = {
    cartItems:localStorage.getItem('cartProducts')? JSON.parse(localStorage.getItem('cartProducts')): [],
    cartItemQuantity: 0,
    cartTotalAmount: 0,
    
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            
            const itemIndex = state.cartItems.findIndex(item => item._id === action.payload._id);

            if (itemIndex >= 0) {
                state.cartItems[itemIndex].cartQuantity += 1;
                toast.success(`increased cart quantity of ${action.payload.name}`)
            } else {
                 const tempProduct={...action.payload,cartQuantity:1}
                state.cartItems.push(tempProduct);
                toast.success(`${action.payload.name} added to cart`)
            }

            localStorage.setItem('cartProducts', JSON.stringify(state.cartItems));
        },
        removeCartItem: (state, action) => {
            const itemIndex = state.cartItems.findIndex(item => item._id === action.payload._id);
            if (itemIndex >= 0) {
                state.cartItems[itemIndex].cartQuantity-=1
            }
            toast(`Reduced cart quantity from ${action.payload.name} to cart`);
                  localStorage.setItem('cartProducts', JSON.stringify(state.cartItems));
            
        },
        deleteCartItem: (state, action) => {
            const cartItem = state.cartItems.filter(item => item._id !== action.payload._id)
            state.cartItems = cartItem;
            toast(`Removed ${action.payload.name} from cart`)
                  localStorage.setItem('cartProducts', JSON.stringify(state.cartItems));
        },
        clearCart: (state) => {
            state.cartItems = []
                  localStorage.setItem('cartProducts', JSON.stringify(state.cartItems));
        },
        calculateTotals: (state, action) => {
            let { total, quantity } = state.cartItems.reduce((cartTotal,cartItem) => {
                 const { price, cartQuantity } = cartItem;
                const itemTotal = price * cartQuantity;
                cartTotal.total += itemTotal;
                cartTotal.quantity += cartQuantity;

                return cartTotal;

            }, {
                total: 0,
                quantity:0
            })
            state.cartTotalAmount = total;
            state.cartItemQuantity=quantity
        }
    }
})

export default cartSlice.reducer;

export const { addToCart,removeCartItem,deleteCartItem,clearCart,calculateTotals } = cartSlice.actions;