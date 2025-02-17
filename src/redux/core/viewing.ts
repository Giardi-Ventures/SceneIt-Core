import {PayloadAction} from "@reduxjs/toolkit";
import {createCoreSlice} from "../util/redux-global";

export interface ViewingState {
  data: any[] | null;
}

const initialState: ViewingState = {
  data: [],
};

const viewingSlice = createCoreSlice({
  name: "viewing",
  initialState,
  reducers: {
    updateViewingStore: (state, {payload}: PayloadAction<Partial<ViewingState>>) => ({
      ...state,
      ...payload,
    }),
  },
});

export const viewingReducer = viewingSlice.reducer;
export const {updateViewingStore} = viewingSlice.actions;
export const ViewingStore: (state: any) => ViewingState = (state: any) => state.viewing;
