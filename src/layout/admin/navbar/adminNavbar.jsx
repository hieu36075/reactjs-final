import { useState } from "react";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import FullscreenExitOutlinedIcon from "@mui/icons-material/FullscreenExitOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import { DarkModeContext } from "../../../context/DarkMode/darkModeContext";
import { useContext } from "react";
import { PopupMenu } from "react-simple-widgets";



const AdminNavbar = () => {
  const { dispatch } = useContext(DarkModeContext);
  const [isOpen, setIsOpen] = useState(false);
  


  return (
    <div className="h-12 flex items-center text-sm border-b border-gray">
      <div className="w-full p-5 flex items-center justify-between">
        <div className="flex items-center p-1">
        </div>
        <div className="flex items-center">
          <PopupMenu>
          <div className="flex items-center mr-5 relative" >
            <img
              src="https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt=""
              className="w-8 h-8" 
            />
          </div>
          <div className={`absolute bg-white w-48 absolute h-5 w-5 ${isOpen? 'opacity-100 visible' : 'opacity-0 invisible'}`} >
          <h3 className="w-full text-center text-lg font-medium leading-5">The Kiet<br/>
          <span>Website Designer</span>
          </h3>
          <ul>

          </ul>
        </div>
          </PopupMenu>
        </div>
        
      </div>
    </div>
  );
};

export default AdminNavbar;