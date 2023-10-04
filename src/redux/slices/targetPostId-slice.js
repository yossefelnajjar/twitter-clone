import { createSlice } from "@reduxjs/toolkit";

export const targetPostIdSlice = createSlice({
  initialState: null,
  name: "targetPostIdSlice",

  reducers: {
    setTargetPostId: (state, action) => {
      return action.payload;
    },
  },
});

export const { setTargetPostId } = targetPostIdSlice.actions;
export default targetPostIdSlice.reducer;
