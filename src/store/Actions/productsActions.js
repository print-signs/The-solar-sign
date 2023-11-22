import axios from "axios";
import {
  getProducts as getProductsAction,
  getProductDetails as getProductDetailsAction,
} from "../slices/productSlice";

export const getAllProducts = () => async (dispatch) => {
  // console.log("dfs");
  try {
    const getAllProducts = await axios.get(
      "https://printsigns.onrender.com/api/product/getAll/"
    );
    // console.log(registerUser);
    if (!getAllProducts) {
      return false;
    } else {
      const productsData = getAllProducts.data;
      // console.log(productsData);
      dispatch(getProductsAction(productsData));
      return true;
    }
  } catch (error) {
    console.log("error in getAllProducts action", error.message);
  }
};

export const getSingleProductDetails = (id) => async (dispatch) => {
  try {
    const getSingleProductDetails = await axios.get(
      `https://printsigns.onrender.com/api/product/getOne/${id}`
    );

    if (!getSingleProductDetails) {
      return false;
    } else {
      const productsDetailsData = getSingleProductDetails.data.product;
      dispatch(getProductDetailsAction(productsDetailsData));
      return true;
    }
  } catch (error) {
    console.log("error in getAllProducts action", error.message);
  }
};

