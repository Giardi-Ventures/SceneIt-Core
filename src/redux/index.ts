import {authReducer} from "./common/auth";
import {userReducer} from "./common/user";
import {EnhancedStore} from "@reduxjs/toolkit";

export let globalStore : EnhancedStore = null;
export function setGlobalStore(store : EnhancedStore) {
  globalStore = store;
}

export const CoreReducers = {
  auth: authReducer,
  user: userReducer,
};

export * from "./common/auth";
export * from "./common/user";
