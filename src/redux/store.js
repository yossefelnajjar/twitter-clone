import { configureStore } from "@reduxjs/toolkit";
import personalInfoSlice  from "./slices/personalInfo-slice";
import trendsSlice        from "./slices/trends-slice";
import editTweetInfoSlice from "./slices/editTweetInfo-slice";
import targetPostIdSlice  from "./slices/targetPostId-slice";
import showPopUpSlice     from "./slices/popUp-slice";

export const store = configureStore({
  reducer: {
    personalInfo:  personalInfoSlice,
    showPopUp:     showPopUpSlice,
    editTweetInfo: editTweetInfoSlice,
    targetPostId:  targetPostIdSlice,
    trends:        trendsSlice,
  },
});
