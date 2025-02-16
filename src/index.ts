import {EnhancedStore} from "@reduxjs/toolkit";
import {setGlobalStore} from "./redux";

export * from "./types"
export * from "./common"
export * from "./apis"
export * from "./utils"
export * from "./hooks"
export * from "./redux"

export function setupCore(store: EnhancedStore) {
  setGlobalStore(store);
}
