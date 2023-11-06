
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import StoreIcon from "@mui/icons-material/Store";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../../context/DarkMode/darkModeContext";
import { useContext } from "react";

const Sidebar = () => {
  const { dispatch } = useContext(DarkModeContext);
  return (
    <div className="min-h-screen bg-white">
      <div className="h-12 flex items-center justify-center">
        <Link to="/admin/dashboard" style={{ textDecoration: "none" }}>
          <span className="text-xl font-bold text-purple-600">Admin</span>
        </Link>
      </div>
      <hr className="h-0"/>
      <div className="pl-2">
        <ul className="m-0 p-0">
          <p className="font-bold mt-4 mb-1">MAIN</p>
          <Link to="/admin/dashboard" style={{ textDecoration: "none" }}>
          <li className="flex items-center p-1 cursor-pointer hover:bg-indigo-100">
            <DashboardIcon className="text-lg text-purple-600" />
            <span className="text-xs font-semibold ml-2">Dashboard</span>
          </li>
          </Link>
          <p className="font-bold mt-4 mb-1">LISTS</p>
          <Link to="/admin/users" style={{ textDecoration: "none" }}>
            <li className="flex items-center p-1 cursor-pointer hover:bg-indigo-100">
              <PersonOutlineIcon className="text-lg text-purple-600" />
              <span className="text-xs font-semibold ml-2">Users</span>
            </li>
          </Link>
          <Link to="/admin/category" style={{ textDecoration: "none" }}>
            <li className="flex items-center p-1 cursor-pointer hover:bg-indigo-100">
              <StoreIcon className="text-lg text-purple-600" />
              <span className="text-xs font-semibold ml-2">Category</span>
            </li>
          </Link>
          <li className="flex items-center p-1 cursor-pointer hover:bg-indigo-100">
            <LocalShippingIcon  className="text-lg text-purple-600"/>
            <span className="text-xs font-semibold ml-2">Delivery</span>
          </li>
         
          <p className="font-bold mt-4 mb-1">USER</p>
          <li className="flex items-center p-1 cursor-pointer hover:bg-indigo-100">
            <AccountCircleOutlinedIcon  className="text-lg text-purple-600" />
            <span className="text-xs font-semibold ml-2">Profile</span>
          </li>
          <li className="flex items-center p-1 cursor-pointer hover:bg-indigo-100">
            <ExitToAppIcon  className="text-lg text-purple-600" />
            <span className="text-xs font-semibold ml-2">Logout</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;