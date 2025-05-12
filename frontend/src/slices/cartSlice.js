import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../utils/cartUtils";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItems: [] };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // state :- current state of cart slice like (cartItem among other properties)
    //action :- an object that contains the payload - in this case item to be added to the cart
    addToCart: (state, action) => {
      const item = action.payload;
      const existItem = state.cartItems?.find((x) => x._id === item._id); // check item is exist in the cart

      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x._id === existItem._id ? item : x
        ); // It replaces the existing item in the cart with the new item object.
        //This is useful if the new item contains an updated quantity or other updated fields.
      } else {
        state.cartItems = [...state.cartItems, item];
      }

      return updateCart(state);
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);

      return updateCart(state);
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
