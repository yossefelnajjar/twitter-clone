import { createSlice } from "@reduxjs/toolkit";

export const showPopUpSlice = createSlice({
  initialState: "",
  name: "showPopUpSlice",

  reducers: {
    setShowPopUp: (state, action) => {
      return action.payload;
    },
  },
});

export const { setShowPopUp } = showPopUpSlice.actions;
export default showPopUpSlice.reducer;
