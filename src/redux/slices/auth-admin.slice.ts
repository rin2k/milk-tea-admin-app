import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IAuthAdmin {
  id: string;
  isAuthenticated?: boolean;
}

const initialState: IAuthAdmin = {
  id: "",
  isAuthenticated: false,
};

export const adminState = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    addAdmin: (state, action: PayloadAction<string>) => {
      state = { ...state, id: action.payload, isAuthenticated: true };
      return state;
    },
    removeAdmin: (state) => {
      state = { ...initialState };
      return state;
    },
  },
});

const { reducer, actions } = adminState;
export const { addAdmin, removeAdmin } = actions;
export default reducer;
