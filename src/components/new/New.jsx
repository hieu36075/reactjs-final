import React, { useState } from "react";
import "./new.scss"
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import Sidebar from "../../layout/admin/sidebar/Sidebar";
import AdminNavbar from "../../layout/admin/navbar/AdminNavbar";
import { useDispatch } from "react-redux";

const New = ({ inputs, title, onSubmit  }) => {
  const dispatch = useDispatch();
  const [file, setFile] = useState("");
  const [userInputs, setUserInputs] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  };

  const handleUploadFile = () =>{
      // dispatch()
  }
  return (
    <div className="new">
    <Sidebar />
    <div className="newContainer">
      <AdminNavbar />
      <div className="top">
        <h1>{title}</h1>
      </div>
      <div className="bottom">
        <div className="left ">
          <img
            src={
              file
                ? URL.createObjectURL(file)
                : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
            }
            alt=""
          />
        </div>
        <div className="right">
          <form>
            <div className="formInput">
              <label htmlFor="file">
                Image: <DriveFolderUploadOutlinedIcon className="icon" />
              </label>
              <input
                type="file"
                id="file"
                onChange={(e) => setFile(e.target.files[0])}
                style={{ display: "none" }}
              />
            </div>
            {inputs.map((input) => (
              <div className="formInput" key={input.id}>
                <label>{input.label}</label>
                <input
                  type={input.type}
                  name={input.name}
                  value={userInputs[input.name] || ""}
                  placeholder={input.placeholder}
                  onChange={handleInputChange}
                />
              </div>
            ))}

      <button type="button" onClick={() => onSubmit(userInputs, file)}>
        Save
      </button>
          </form>
        </div>
      </div>
    </div>
  </div>
  );
};

export default New;
