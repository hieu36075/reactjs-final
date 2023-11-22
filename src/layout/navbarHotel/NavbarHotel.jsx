import "./SidebarHotel.css"
import { AiOutlineHome, AiOutlineDashboard } from 'react-icons/ai';
import { TbBrandCampaignmonitor } from 'react-icons/tb';
import { SiGoogleclassroom } from 'react-icons/si';
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";


const NavbarHotel = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const [type, setType] = useState('current')
    const handleChangeType = (currentType)=>{
        setType(currentType)
    }
    return (
        // <div className="cd-box">
        //     {/* <div className="cd_item">
        //         <AiOutlineHome className="icon"/>
        //         <p>Home</p>
        //     </div> */}
        //     <div className="cd_item" onClick={()=>navigate(`/account/manager/${id}`)} >
        //         <SiGoogleclassroom />
        //         <p>Room</p>
        //     </div>
        //     <div className="cd_item" onClick={()=>navigate(`/account/managerDashboard/${id}`)}>
        //         <AiOutlineDashboard />
        //         <p>Dashboard</p>
        //     </div>
        // </div>
        <div>
        <nav className="w-full flex justify-center mt-8 gap-2 mb-8">
          <button
            className={`py-2 px-6 ${
              type === "current" ? "bg-primary text-white rounded-full" : ""
            }`}
            onClick={() => {
                handleChangeType("current");
            }}
          >
            Manager Room
          </button>
          <button
            className={`py-2 px-6 ${
              type === "listOrder" ? "bg-primary text-white rounded-full" : ""
            }`}
            onClick={() => {
              handleChangeType('listOrder');
              navigate(`/account/managerDashboard/${id}`)
            }}
          >
            Dashboard
          </button>
        </nav>
      </div>
    )
}

export default NavbarHotel;