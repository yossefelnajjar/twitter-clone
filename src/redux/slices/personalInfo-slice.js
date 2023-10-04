import { createSlice } from "@reduxjs/toolkit";

export const personalInfoSlice = createSlice({
  initialState: {},
  name: "personalInfoSlice",

  reducers: {
    addInfo: (state, action) => {
      return action.payload;
    },

    clearInfo: () => {
      return {};
    },
  },
});

export const { addInfo, clearInfo } = personalInfoSlice.actions;
export default personalInfoSlice.reducer;
