import { createSlice } from "@reduxjs/toolkit";

export const editTweetInfoSlice = createSlice({
  initialState: {
    id: 0,
    bodyContent: "",
  },
  name: "editTweetInfoSlice",

  reducers: {
    setEditTweetInfo: (state, action) => {
      return action.payload;
    },
  },
});

export const { setEditTweetInfo } = editTweetInfoSlice.actions;
export default editTweetInfoSlice.reducer;
