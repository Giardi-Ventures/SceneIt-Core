import {PayloadAction} from "@reduxjs/toolkit";
import {createCoreSlice} from "../util/redux-global";
import {List} from "../../types/lists/list";

export interface ListState {
  watch: List | null;
  data: List[] | null;
}

const initialState: ListState = {
  watch: null,
  data: [],
};

const listSlice = createCoreSlice({
  name: "list",
  initialState,
  reducers: {
    updateListStore: (state, {payload}: PayloadAction<Partial<ListState>>) => ({
      ...state,
      ...payload,
    }),
  },
});

export const listReducer = listSlice.reducer;
export const {updateListStore} = listSlice.actions;
export const ListStore: (state: any) => ListState = (state: any) => state.list;
