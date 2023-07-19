import "./new.scss";
import Sidebar from "../../../layout/admin/sidebar/Sidebar";
import AdminNavbar from "../../../layout/admin/navbar/AdminNavbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";

const New = ({ inputs, title }) => {
  const [file, setFile] = useState("");


  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <AdminNavbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
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
                <div className="formInput">
                    <label>Name</label>
                    <input type="text" placeholder="Hieu"/>
                </div>
                <div className="formInput">
                    <label>Name</label>
                    <input type="text" placeholder="Hieu"/>
                </div>
                <div className="formInput">
                    <label>Name</label>
                    <input type="text" placeholder="Hieu"/>
                </div>
                <div className="formInput">
                    <label>Name</label>
                    <input type="text" placeholder="Hieu"/>
                </div>
                <div className="formInput">
                    <label>Name</label>
                    <input type="text" placeholder="Hieu"/>
                </div>
              {/* {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input type={input.type} placeholder={input.placeholder} />
                </div>
              ))} */}
              <button>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;