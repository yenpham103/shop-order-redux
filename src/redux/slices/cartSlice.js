import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "carts",
  initialState: {
    items: JSON.parse(localStorage.getItem("cartItems")) || [],
  },
  reducers: {
    addCart: (state, action) => {
      const existingCartItemIndex = state.items.findIndex(
        (item) => item._id === action.payload._id
      );
      const updateItems = [...state.items];
      if (existingCartItemIndex > -1) {
        const existingItem = state.items[existingCartItemIndex];
        const updatedItem = {
          ...existingItem,
          quantity: existingItem.quantity + 1,
        };
        updateItems[existingCartItemIndex] = updatedItem;
      } else {
        updateItems.push({ ...action.payload, quantity: 1 });
      }
      state.items = updateItems;
      localStorage.setItem("cartItems", JSON.stringify(updateItems));
    },
    removeCart: (state, action) => {
      const existingCartItemIndex = state.items.findIndex(
        (item) => item._id === action.payload
      );
      if (existingCartItemIndex !== -1) {
        const existingCartItem = state.items[existingCartItemIndex];
        const updatedItems = [...state.items];
        if (existingCartItem.quantity === 1) {
          updatedItems.splice(existingCartItemIndex, 1);
        } else {
          const updatedItem = {
            ...existingCartItem,
            quantity: existingCartItem.quantity - 1,
          };
          updatedItems[existingCartItemIndex] = updatedItem;
        }
        state.items = updatedItems;
        localStorage.setItem("cartItems", JSON.stringify(updatedItems));
      }
    },
    deleteCart: (state, action) => {
      state.items = state.items.filter((item) => item._id !== action.payload);
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },
    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem("cartItems");
    },
  },
});
export const { addCart, removeCart, deleteCart, clearCart } = cartSlice.actions;
