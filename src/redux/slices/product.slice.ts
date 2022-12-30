import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../types/product";

const initialState: Product[] = [
  {
    id: 1,
    name: "Trà lúa mach",
    category: {
      id: 1,
      name: "Trà",
    },
    price: 20000,
  },
];

export const productState = createSlice({
  name: "product",
  initialState: initialState,
  reducers: {
    addProducts: (state, action: PayloadAction<Product[]>) => {
      state = [...action.payload];
      return state;
    },

    addProduct: (state, action: PayloadAction<Product>) => {
      state = [...state, action.payload];
      return state;
    },

    deleteProduct: (state, action: PayloadAction<Product>) => {
      state = state.filter((product) => product.id !== action.payload.id);
      return state;
    },

    updateProduct: (state, action: PayloadAction<Product>) => {
      state = state.map((product) =>
        product.id === action.payload.id
          ? { ...product, ...action.payload }
          : product
      );
      return state;
    },
  },
});

const { reducer, actions } = productState;
export const { addProducts, addProduct, deleteProduct, updateProduct } =
  actions;
export default reducer;
