import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], 
    totalPrice: 0,
  },
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const existing = state.items.find(item => item.product.id === product.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ product, quantity: 1 });
      }
      state.totalPrice += product.price;
    },
    increaseQuantity: (state, action) => {
      const id = action.payload;
      const item = state.items.find(item => item.product.id === id);
      if (item) {
        item.quantity += 1;
        state.totalPrice += item.product.price;
      }
    },
    decreaseQuantity: (state, action) => {
      const id = action.payload;
      const item = state.items.find(item => item.product.id === id);
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
          state.totalPrice -= item.product.price;
        } else {
          state.totalPrice -= item.product.price;
          state.items = state.items.filter(item => item.product.id !== id);
        }
      }
    },
    removeFromCart: (state, action) => {
      const id = action.payload;
      const item = state.items.find(item => item.product.id === id);
      if (item) {
        state.totalPrice -= item.product.price * item.quantity;
        state.items = state.items.filter(item => item.product.id !== id);
      }
    },
  },
});

export const { addToCart, increaseQuantity, decreaseQuantity, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
