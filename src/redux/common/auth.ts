import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface AuthState {
  token: String | null;
}

const initialState: AuthState = {
  token: null,
};

const authSlice = createSlice({
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
