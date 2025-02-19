import {authReducer} from "./common/auth";
import {userReducer} from "./common/user";
import {EnhancedStore} from "@reduxjs/toolkit";
import {viewingReducer} from "./core/viewing";
import {listReducer} from "./core/list";
import {ratingReducer} from "./core/rating";

export let globalStore: EnhancedStore = null;

export function setGlobalStore(store: EnhancedStore) {
  globalStore = store;
}

export const CommonReducers = {
  auth: authReducer,
  user: userReducer,
};

export const CoreReducers = {
  viewing: viewingReducer,
  list: listReducer,
  rating: ratingReducer,
};

function isValidSlice(slice: string) {}

function updateState() {
  return (dispatch, state) => {
    console.log("Bate", state);
    return state;
  };
}

// export function updateGlobalState() {
//   globalStore.dispatch(updateViewingStore({}))
// }

export function updateReduxSlice(slice: string, data: any) {
  // Update whole object on slice
}

export function updateSliceItem(slice: string, id: string | number, data: any) {
  // Updates just one part
}

export * from "./common/auth";
export * from "./common/user";
export * from "./core/viewing";
export * from "./core/rating";
export * from "./core/list";
export * from "./util/redux-global";
