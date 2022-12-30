import { combineReducers } from "@reduxjs/toolkit";
import categoryReducer from "./slices/category.slice";
import productReducer from "./slices/product.slice";
import userReducer from "./slices/user.slice";
const rootReducer = combineReducers({
  user: userReducer,
  product: productReducer,
  category: categoryReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
