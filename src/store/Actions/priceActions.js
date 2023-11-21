import {
    getPrice as getPriceAction,

} from "../storeSlice";

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
            // console.log(subtotal);

            dispatch(getPriceAction(subtotal));
        }
    }
    catch (error) {
        console.log("error in getAllProducts action", error.message);

    }
}