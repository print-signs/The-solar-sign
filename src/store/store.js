import { configureStore } from "@reduxjs/toolkit";
// import productSlice from "./storeSlice";
// import productSlice from "./slices/productSlice";
import rootReducer from "./reducer";
// import storage from "redux-persist/lib/storage";
// import { persistReducer } from "redux-persist";
// import { combineReducers } from "@reduxjs/toolkit";

// const persistConfig = {
//   key: "root",
//   version: 1,
//   storage,
// };

// const reducer = combineReducers({
//   data: storeSlice,
// });

// const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: rootReducer,
});
