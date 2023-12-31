import "./App.css";
import Home from "./Pages/Home";
import {
  Route,
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Root from "./Components/Root";
import SignIn from "./Components/SignUpSignin/SignIn";
import SignUp from "./Components/SignUpSignin/SignUp";
import React from "react";
import ProductDetails from "./Components/ProductDetails";
import Account from "./Pages/Account";
import Cart from "./Pages/Cart";
import Shop from "./Pages/Shop";
import Products from "./Components/Product/Products";
import ContactUs from "./Pages/ContactUs";
import ForgotPassword from './Pages/ForgotPassword';
import PrivateRoute from "./Components/core/Auth/PrivateRoute";
import OrderDetails from "./Components/OrderDetails";
import PrivacePolicy from "./Components/PrivacyPolicy";
import TermAndCondition from "./Components/TermAndCondition";
import ShippingPolicy from "./Components/ShippingPolicy";

const router = createBrowserRouter(

  createRoutesFromElements(
    <React.Fragment>
      <Route path="/" element={<Root />}>
        <Route index element={<Home />} />
        <Route path="/product/category/:category" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/contact" element={<ContactUs />} />

        {/* <Route path="product-details" element={<ProductDetails />} /> */}
        <Route path="account" element={<PrivateRoute> <Account /></PrivateRoute>} />
        <Route path="cart" element={<Cart />} />
        <Route path="shop" element={<Shop />} />

        <Route path='order-details' element={< OrderDetails />} />

        < Route path="signin" element={<SignIn />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />


        <Route path="/privacy-policy" element={<PrivacePolicy />} />
        <Route path="/term-of-use" element={<TermAndCondition />} />
        <Route path="/shipping-policy" element={<ShippingPolicy />} />
      </Route>
    </React.Fragment>
  )
);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
}

export default App;
