import { combineReducers } from "@reduxjs/toolkit"

import productReducer from '../slices/productSlice';
import cartSlice from "../slices/cartSlice";

const rootReducer = combineReducers({
    product: productReducer,
    cart: cartSlice
})

export default rootReducer;