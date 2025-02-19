import {PayloadAction} from "@reduxjs/toolkit";
import {createCoreSlice} from "../util/redux-global";

export interface RatingState {
  data: any[] | null;
}

const initialState: RatingState = {
  data: [],
};

const ratingSlice = createCoreSlice({
  name: "rating",
  initialState,
  reducers: {
    updateRatingStore: (state, {payload}: PayloadAction<Partial<RatingState>>) => ({
      ...state,
      ...payload,
    }),
  },
});

export const ratingReducer = ratingSlice.reducer;
export const {updateRatingStore} = ratingSlice.actions;
export const RatingStore: (state: any) => RatingState = (state: any) => state.rating;
