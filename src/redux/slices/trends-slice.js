import { createSlice } from "@reduxjs/toolkit";

export const trendsSlice = createSlice({
  initialState: [],
  name: "trendsSlice",

  reducers: {
    addTrends: (state, action) => {
      return action.payload;
    },
  },
});

export const { addTrends } = trendsSlice.actions;
export default trendsSlice.reducer;
