import { configureStore } from "@reduxjs/toolkit";
import updateListReducer from "../features/updateList/updateListSlice";

export const store = configureStore({
  reducer: {
    reducer: updateListReducer,
  },
});
