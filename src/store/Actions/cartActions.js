// import axios from "axios";
import {
    getCart as getCartAction,
    increaseCartQuantity as increaseCartQuantityAction,
    decreaseCartQuantity as decreaseCartQuantityAction,
    removeCartItem as removeCartItemAction,
    setCart as setCartAction,
    getPrice as getPriceAction,
    setTax as setTaxAction

} from "../slices/cartSlice";

export const getCartItem = () => async (dispatch) => {
    // console.log("sldjkf");
    try {
        const cartItemString = localStorage.getItem('cart');
        if (!cartItemString) {
            return false;
        } else {
            const cartItems = JSON.parse(cartItemString);

            dispatch(getCartAction(cartItems));
            return true;
        }
    }
    catch (error) {
        console.log("error in get cart item action", error.message);
    }
}
export const setCartItem = (productsDetailsData, qty) => async (dispatch) => {
    try {
        const cartItemString = localStorage.getItem('cart');
        if (!cartItemString) {
            localStorage.setItem('cart', JSON.stringify({
                product: productsDetailsData,
                quantity: qty,
                subtotal: qty * productsDetailsData.price,
            }))

        } else {
            const cartItems = JSON.parse(cartItemString);
            const productIndex = cartItems.findIndex((item) => item.product._id === productsDetailsData._id);
            if (productIndex !== -1) {
                cartItems[productIndex].quantity = qty;
                cartItems[productIndex].subtotal = qty * productsDetailsData.price;

            } else {
                cartItems.push({
                    product: productsDetailsData,
                    quantity: qty,
                    subtotal: qty * productsDetailsData.price,

                });
            }
            let allSubTotal = JSON.parse(localStorage.getItem('subtotal')) || 0;
            allSubTotal += qty * productsDetailsData.price
            localStorage.setItem('subtotal', allSubTotal)
            localStorage.setItem('cart', JSON.stringify(cartItems));
            dispatch(setCartAction(cartItems));
            return true;
        }
    }
    catch (error) {
        console.log("error in set cart item action", error.message);
    }
}

export const increaseQuantity = (id) => async (dispatch) => {
    try {
        const cartItemString = localStorage.getItem('cart');
        let allSubTotal = Number(localStorage.getItem('subtotal'))

        if (!cartItemString) {
            return false;
        } else {
            const cartItems = JSON.parse(cartItemString);
            const updatedCart = cartItems.map((item) => {
                if (item.product._id === id) {
                    allSubTotal += Number(item.product.price)
                    return { ...item, quantity: item.quantity + 1, subtotal: item.subtotal + item.product.price };
                }
                return item;
            });
            localStorage.setItem('cart', JSON.stringify(updatedCart));
            localStorage.setItem('subtotal', JSON.stringify(allSubTotal));
            dispatch(increaseCartQuantityAction(updatedCart));
        }
    }
    catch (error) {
        console.log("error in increase cart quantity action", error.message);
    }
}

export const decreaseQuantity = (id) => async (dispatch) => {
    try {
        const cartItemString = localStorage.getItem('cart');
        let allSubTotal = Number(localStorage.getItem('subtotal'))
        if (!cartItemString) {
            return false;
        } else {
            const cartItems = JSON.parse(cartItemString);
            const updatedCart = cartItems.map((item) => {
                if (item.product._id === id && item.quantity > 1) {
                    allSubTotal -= item.product.price;
                    return { ...item, quantity: item.quantity - 1, subtotal: item.subtotal - item.product.price };
                }
                return item;
            });
            localStorage.setItem('cart', JSON.stringify(updatedCart));
            localStorage.setItem('subtotal', JSON.stringify(allSubTotal));
            dispatch(decreaseCartQuantityAction(updatedCart));
        }
    }
    catch (error) {
        console.log("error in dectease cart quantity action", error.message);
    }
}
export const removeItemFromCart = (id) => (dispatch) => {
    try {
        const cartItemString = localStorage.getItem('cart');
        if (!cartItemString) {
            return false;
        } else {
            const cartItems = JSON.parse(cartItemString);
            const updatedCart = cartItems.filter((item) => item.product._id !== id);
            localStorage.setItem('cart', JSON.stringify(updatedCart));
            localStorage.setItem('tax', 0);
            dispatch(removeCartItemAction(updatedCart))
        }
    }
    catch (error) {
        console.log("error in remove from cart action", error.message);

    }
}

export const getSubTotalPrice = () => async (dispatch) => {
    try {
        const cartItemString = localStorage.getItem('cart');
        if (!cartItemString) {
            return false;
        } else {
            const cartItems = JSON.parse(cartItemString);
            let subtotal = 0;
            cartItems.map((item) => {
                subtotal += item.subtotal;
            });
            localStorage.setItem('subtotal', subtotal)
            dispatch(getPriceAction(subtotal));
        }
    }
    catch (error) {
        console.log("error in getAllProducts action", error.message);

    }
}


export const setTaxPrice = (taxType) => async (dispatch) => {

    let taxPrice = localStorage.getItem('tax') ? Number(localStorage.getItem('tax')) : 0
    taxPrice = taxType === 'express' ? 15 : 0;
    localStorage.setItem('tax', (taxPrice))

    dispatch(setTaxAction(taxPrice));

}