import React, { useEffect, useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import axios from "axios";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { isAutheticated } from "../../Auth";
import swal from "sweetalert";
import OrderComplete from "../OrderComplete";

const PaypalPayment = ({ handleplaceOrderClick, selectedAddress }) => {
  const cartItem = useSelector((state) => state.cart.cart);
  const allSubTotal = useSelector((state) => state.cart.subtotal);
  const [addressId, setAddressId] = useState(selectedAddress);
  const token = isAutheticated();
  useEffect(() => {
    setAddressId(selectedAddress);
  });
  const [clientId, setClientId] = useState();
  const getclientid = async () => {
    try {
      const resp = await axios.get(`/api/order/clientid/get/`, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${token}`,
        },
      });
      setClientId(resp.data?.clientId);
    } catch (error) {
      console.error("Error creating order:", error.message);
      throw error;
    }
  };
  useEffect(() => {
    getclientid();
  });
  //create order
  const createOrder = async (data) => {
    try {
      const response = await axios.post(
        `/api/order/checkout/`,
        {
          address: addressId,
          cart: cartItem,
          subtotal: allSubTotal,
        },
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${token}`, // Replace {token} with your actual token
          },
        }
      );
      if (response.data?.responseData?.status === "CREATED") {
        const product_odrId = response.data?.product_orderId;
        const orderID = response.data?.responseData?.id;
        // console.log("product_odrId", product_odrId);
        return orderID;
      }
    } catch (error) {
      console.error("Error creating order:", error.message);
    }
  };
  const onApprove = async (data, actions) => {
    const orderID = data.orderID;
    if (!orderID) {
      toast.error("No order ID provided for onApprove");
      return;
    }
    try {
      // Perform actions on order approval
      const captureResponse = await axios.post(
        `/api/order/${orderID}/capture/payment`,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
      if (captureResponse.data) {
        console.log("captureResponse.data", captureResponse.data);
        const name = captureResponse.data.payer.name.given_name;
        const orderId = captureResponse.data.id;
        // alert(`Transaction completed by ${name},order ID:${orderId}`);
        toast.success(`Payment Success By ${name}`);

        const additionalData = {
          orderId: orderId,
          name: name,
          date: Date.now(),
        };
        // actions.redirect({handleplaceOrderClick() < OrderComplete/>});
        actions.redirect(<OrderComplete {...additionalData} />);
        handleplaceOrderClick();
      }
    } catch (error) {
      console.error("Error capturing order:", error.message);
      toast.error(`Error capturing order:`);
      swal({
        title: "error",
        text: "Error capturing order ",
        icon: "error",
        button: "ok",
        dangerMode: true,
      });
      // actions.redirect();

      // Handle error appropriately
    }
  };

  return (
    <>
      {/* <button onClick={(e)=>{createOrderrrr(e)}}>click</button> */}

      {clientId && addressId && (
        <PayPalScriptProvider
          options={{
            clientId: `${clientId}`,
          }}
        >
          <PayPalButtons
            createOrder={(data, actions) => createOrder(data, actions)}
            onApprove={(data, actions) => onApprove(data, actions)}
            isDisabled={true}
            style={{
              layout: "horizontal", // Adjust the layout as needed( vertical)
              color: "silver", // Specify the color
              shape: "rect", // Specify the shape
              label: "pay", // Specify the button label
              tagline: false,
              height: 46, // Specify the height
            }}
          />
        </PayPalScriptProvider>
      )}
    </>
  );
};

export default PaypalPayment;
// sb-g8cay6188684@personal.example.com
// p>y5OF?"
