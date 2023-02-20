import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICategory } from "@types";

const initialState: ICategory[] = [];

export const categoryState = createSlice({
  name: "product",
  initialState: initialState,
  reducers: {
    addCategories: (state, action: PayloadAction<ICategory[]>) => {
      state = [...action.payload];
      return state;
    },
  },
});

const { reducer, actions } = categoryState;
export const { addCategories } = actions;
export default reducer;
