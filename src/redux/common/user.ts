import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {useSelector} from "react-redux";
import {Account} from "../../types";
import {createCoreSlice} from "../util/redux-global";

export interface UserState {
  account: Account | null;
}

const initialState: UserState = {
  account: null,
};

const userSlice = createCoreSlice({
  name: "auth",
  initialState,
  reducers: {
    updateUser: (state, {payload}: PayloadAction<Partial<UserState>>) => ({
      ...state,
      ...payload,
    }),
  },
});

export const {updateUser} = userSlice.actions;
export const userReducer = userSlice.reducer;
export const UserStore = (state: any) => state.user;

export function useUserStore(): UserState {
  return useSelector(UserStore);
}
