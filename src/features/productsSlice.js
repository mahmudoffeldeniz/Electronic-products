import { createSlice } from '@reduxjs/toolkit';
import productsData from '../data/products.json';

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: productsData, 
  },
  reducers: {
    addProduct: (state, action) => {
      state.items.push(action.payload);
    },
  },
});

export const { addProduct } = productsSlice.actions;
export default productsSlice.reducer;
