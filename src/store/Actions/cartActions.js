// import axios from "axios";
import {
    getCart as getCartAction,
    increaseCartQuantity as increaseCartQuantityAction,
    decreaseCartQuantity as decreaseCartQuantityAction,
    removeCartItem as removeCartItemAction

} from "../storeSlice";



export const getCartItem = () => async (dispatch) => {
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

export const increaseQuantity = (id) => async (dispatch) => {
    try {
        const cartItemString = localStorage.getItem('cart');
        let allSubTotal = Number(localStorage.getItem('subtotal'))

        // console.log(typeof allSubTotal);
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
                    // console.log(item.subtotal - item.product.price);
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
            dispatch(removeCartItemAction(updatedCart))
        }
    }
    catch (error) {
        console.log("error in remove from cart action", error.message);

    }
}   