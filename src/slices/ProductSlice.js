import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
    name:'product',
    initialState:{
        selectedProductId: null,
        cart:{
            cartItem:[],
            cartCount:0
        }
    },
    reducers:{
        setSelectedProductId:(state,action)=>{
            state.selectedProductId = action.payload;
        },

        addToCart:(state,action) =>{
            state.cart.cartItem.push(action.payload);

            state.cart.cartCount = state.cart.cartItem.length;
        },
    },
});

export const {setSelectedProductId, addToCart} = productSlice.actions;
export default productSlice.reducer;
