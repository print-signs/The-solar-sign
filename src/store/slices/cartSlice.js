import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cart: [],
    subtotal: 0,
    shippingCharge: 0,
    tax: 0,
    shippingInfo: null
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {

        setCart: (state, action) => {
            state.cart = action.payload;
        },
        getCart: (state, action) => {

            state.cart = action.payload;
        },
        increaseCartQuantity: (state, action) => {

            const updatedCart = action.payload;
            state.cart = [...updatedCart];
        },
        decreaseCartQuantity: (state, action) => {
            const updatedCart = action.payload
            state.cart = [...updatedCart]
        },
        removeCartItem: (state, action) => {
            state.cart = action.payload
        },
        getPrice: (state, action) => {
            state.subtotal = action.payload
        },
    },
});

export const {

    getCart,
    increaseCartQuantity,
    decreaseCartQuantity,
    getPrice,
    setCart,
    removeCartItem
} = cartSlice.actions;

export default cartSlice.reducer;
