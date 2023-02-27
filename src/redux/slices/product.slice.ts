import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct } from "@types";

const initialState: IProduct[] = [];

export const productState = createSlice({
  name: "product",
  initialState: initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<IProduct[]>) => {
      state = [...action.payload];
      return state;
    },
  },
});

const { reducer, actions } = productState;
export const { addProduct } = actions;
export default reducer;
