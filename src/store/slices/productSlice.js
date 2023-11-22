import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  products: [],
  productDetails: {},
};

const productSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    getProducts: (state, action) => {
      // console.log(action.payload.product);
      state.products = action.payload.product
    },
    getProductDetails: (state, action) => {
      state.productDetails = action.payload
    },

  },
});

export const {
  getProducts,
  getProductDetails,
} = productSlice.actions;

export default productSlice.reducer;
