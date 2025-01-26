import {authReducer} from "./auth";
import {userReducer} from "./user";
import {EnhancedStore} from "@reduxjs/toolkit";

export let globalStore : EnhancedStore = null;
export function setGlobalStore(store : EnhancedStore) {
  globalStore = store;
}

export const CoreReducers = {
  auth: authReducer,
  user: userReducer,
};

export * from "./auth";
export * from "./user";
