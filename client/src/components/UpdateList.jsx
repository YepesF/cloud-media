import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { update } from "../features/updateList/updateListSlice";
import { updateAsync } from "../features/updateList/updateListSlice";

const UpdateList = () => {
  const message = useSelector((state) => state.reducer.value);
  const dispatch = useDispatch();

  const handleClic = (event) => {
    dispatch(updateAsync());
  };
  return (
    <>
      <h2>{message}</h2>
      <button onClick={handleClic}>Update List</button>
    </>
  );
};

export default UpdateList;
