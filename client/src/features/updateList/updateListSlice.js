import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const baseURL = process.env.REACT_APP_API || "http://localhost:3001";

const initialState = {
  value: "",
};

export const updateListSlice = createSlice({
  name: "updateList",
  initialState,
  reducers: {
    update: async (state, action) => {
      state.value = action.payload;
    },
  },
});

export const updateAsync = () => async (dispatch) => {
  try {
    const response = await axios.get(`${baseURL}/updateList`);
    dispatch(update(response.data));
  } catch (error) {
    console.log(error.message);
  }
};

// Action creators are generated for each case reducer function
export const { update } = updateListSlice.actions;

export default updateListSlice.reducer;
