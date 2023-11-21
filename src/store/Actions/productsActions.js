import axios from "axios";
import {
  getProducts as getProductsAction,
  getProductDetails as getProductDetailsAction,
} from "../storeSlice";

export const getAllProducts = () => async (dispatch) => {
  try {
    const getAllProducts = await axios.get(
      "https://printsigns.onrender.com/api/product/getAll/"
    );
    // console.log(registerUser);
    if (!getAllProducts) {
      return false;
    } else {
      const productsData = getAllProducts.data;
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

