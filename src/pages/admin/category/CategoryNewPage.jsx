import React from "react";
import New from "../../../components/new/New";
import { addCategory } from "../../../redux/category/categoryThunks";
import { useDispatch } from "react-redux";
const CategoryNewPage = () => {
  const dispatch = useDispatch()
  // Danh sách các trường nhập liệu cho component "New"
  const inputs = [
    { id: 1, name: "name", label: "Name", type: "text", placeholder: "Enter your name" },

  ];

  // Tiêu đề cho component "New"
  const title = "Create New Category";

  // Callback function để xử lý dữ liệu từ component "New"
  const createCategory  = (userInputs, file) => {
    dispatch(addCategory(userInputs,file))
    // Xử lý dữ liệu tại đây, ví dụ: gửi dữ liệu lên server
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
