import React, { useEffect, useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import axios from "axios";
import toast from "react-hot-toast";

const PaypalPayment = ({ handleplaceOrderClick, selectedAddress }) => {
  const [addressId, setAddressId] = useState(selectedAddress);

  useEffect(() => {
    setAddressId(selectedAddress);
  });
  console.log("address", addressId);

  const [clientId, setClientId] = useState();
  const getclientid = async () => {
    // console.log("addressId", addressId);

    try {
      const resp = await axios.get(`/api/order/clientid/get/`, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer {token}`, // Replace {token} with your actual token
        },
      });
      setClientId(resp.data?.clientId);
    } catch (error) {
      console.error("Error creating order:", error.message);
      throw error; // Propagate the error for handling in the caller
    }
  };
  useEffect(() => {
    getclientid();
  });

  useEffect(() => {});
  const createOrder = async (data) => {
    try {
      console.log("selectedAddress", selectedAddress);

      const response = await axios.post(
        `/api/order/checkout/`,
        {
          product: {
            name: "apple",
            quantity: "5",
          },
          // cart: [
          //   {
          //     id: "YOUR_PRODUCT_ID",
          //     quantity: "YOUR_PRODUCT_QUANTITY",
          //   },
          // ],
          // }),
        },
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer {token}`, // Replace {token} with your actual token
          },
        }
      );
      const orderID = response.data?.responseData?.id;
      console.log("orderID", orderID);
      return orderID;
    } catch (error) {
      console.error("Error creating order:", error.message);
      throw error; // Propagate the error for handling in the caller
    }
  };
  const onApprove = async (data, actions) => {
    const orderID = data.orderID;
    if (!orderID) {
      console.error("No order ID provided in onApprove");
      return;
    }
    try {
      // Perform actions on order approval
      const captureResponse = await axios.post(
        `/api/order/${orderID}/capture/payment`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer {token}`, // Replace {token} with your actual token
          },
        }
      );
      if (captureResponse.data) {
        console.log("captureResponse.data", captureResponse.data);
        const name = captureResponse.data.payer.name.given_name;
        const orderId = captureResponse.data.id;
        // alert(`Transaction completed by ${name},order ID:${orderId}`);
        actions.redirect(handleplaceOrderClick());
      }
    } catch (error) {
      console.error("Error capturing order:", error.message);
      actions.redirect();

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
