import { combineReducers } from "@reduxjs/toolkit";
import categoryReducer from "./slices/category.slice";
import userReducer from "./slices/user.slice";
import producReducer from "./slices/product.slice";
import adminReducer from "./slices/auth-admin.slice";
const rootReducer = combineReducers({
  user: userReducer,
  category: categoryReducer,
  product: producReducer,
  authAdmin: adminReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
