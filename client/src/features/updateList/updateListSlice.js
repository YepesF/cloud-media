import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: "",
};

export const updateListSlice = createSlice({
  name: "updateList",
  initialState,
  reducers: {
    update: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { update } = updateListSlice.actions;

export default updateListSlice.reducer;
