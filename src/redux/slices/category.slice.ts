import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Category } from "../../types/category";

const initialState: Category[] = [
  {
    id: 1,
    name: "Trà ",
  },
  {
    id: 2,
    name: "Bánh ",
  },
  {
    id: 3,
    name: "Củ ",
  },
];

export const categoryState = createSlice({
  name: "product",
  initialState: initialState,
  reducers: {
    addCategories: (state, action: PayloadAction<Category[]>) => {
      state = [...action.payload];
      return state;
    },

    addCategory: (state, action: PayloadAction<Category>) => {
      state = [...state, action.payload];
      return state;
    },

    deleteCategory: (state, action: PayloadAction<Category>) => {
      state = state.filter((product) => product.id !== action.payload.id);
      return state;
    },

    updateCategory: (state, action: PayloadAction<Category>) => {
      state = state.map((product) =>
        product.id === action.payload.id
          ? { ...product, ...action.payload }
          : product
      );
      return state;
    },
  },
});

const { reducer, actions } = categoryState;
export const { addCategories, addCategory, deleteCategory, updateCategory } =
  actions;
export default reducer;
