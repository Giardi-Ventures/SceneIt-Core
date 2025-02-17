import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {createCoreSlice} from "../util/redux-global";

export interface AuthState {
  token: String | null;
}

const initialState: AuthState = {
  token: null,
};

const authSlice = createCoreSlice({
  name: "auth",
  initialState,
  reducers: {
    updateAuth: (state, {payload}: PayloadAction<Partial<AuthState>>) => ({
      ...state,
      ...payload,
    }),
  },
});

export const authReducer = authSlice.reducer;
export const {updateAuth} = authSlice.actions;
export const AuthStore = (state: any) => state.auth;
