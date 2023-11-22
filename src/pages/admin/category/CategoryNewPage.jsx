import React from "react";
import New from "../../../components/new/New";
import { addCategory } from "../../../redux/category/categoryThunks";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
const CategoryNewPage = () => {
  const dispatch = useDispatch()
  const location = useLocation()

  const inputs = [
    { id: 1, name: "name", label: "Name", type: "text", placeholder: "Enter your name" },

  ];

  const title = "Create New Category";

  const createCategory  = (userInputs, file) => {
    // dispatch(addCategory(userInputs,file))
    console.log("avsss")
    console.log("User inputs:", userInputs);
    console.log("File:", file);
  };

  return (
    <div>
      <New inputs={inputs} title={title} onSubmit={createCategory} />
    </div>
  );
};

export default CategoryNewPage;
