import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { update } from "../features/updateList/updateListSlice";
import { updateAsync } from "../features/updateList/updateListSlice";
import "./estyles.css";

const UpdateList = () => {
  const message = useSelector((state) => state.reducer.value);
  const dispatch = useDispatch();

  const handleClic = (event) => {
    dispatch(updateAsync());
  };
  return (
    <>
      <h2 className="hola">{message}</h2>
      <button className="hola" onClick={handleClic}>
        Update List
      </button>
    </>
  );
};

export default UpdateList;
