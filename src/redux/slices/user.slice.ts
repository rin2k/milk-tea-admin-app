import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "@types";

const initialState: IUser[] = [];

export const userState = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    addUsers: (state, action: PayloadAction<IUser[]>) => {
      state = [...action.payload];
      return state;
    },
  },
});

const { reducer, actions } = userState;
export const { addUsers } = actions;
export default reducer;
