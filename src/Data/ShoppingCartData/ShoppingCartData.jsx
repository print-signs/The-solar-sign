import redtable from "../../assets/images/table red.png";
import blacktable from "../../assets/images/table black.png";
import tableLamp from "../../assets/images/table black.png";

const ShoppingCartData = [
  {
    product: {
      src: redtable,
      name: "Tray Table",
      color: "Red",
    },
    quantity: 2,
    price: 19.0,
    subtotal: 38.0,
  },
  {
    product: {
      src: blacktable,
      name: "Tray Table",
      color: "Black",
    },
    quantity: 2,
    price: 19.0,
    subtotal: 38.0,
  },
  {
    product: {
      src: tableLamp,
      name: "Table Lamp",
      color: "Black",
    },
    quantity: 1,
    price: 39.0,
    subtotal: 39.0,
  },
];

export default ShoppingCartData;
