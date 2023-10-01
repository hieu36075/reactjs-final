import "./SidebarHotel.css"
import { AiOutlineHome, AiOutlineDashboard } from 'react-icons/ai';
import { TbBrandCampaignmonitor } from 'react-icons/tb';
import { SiGoogleclassroom } from 'react-icons/si';
import { useNavigate, useParams } from "react-router-dom";


const SidebarHotel = () => {
    const navigate = useNavigate();
    const {id} = useParams();

    return (
        <div className="cd-box">
            {/* <div className="cd_item">
                <AiOutlineHome className="icon"/>
                <p>Home</p>
            </div> */}
            <div className="cd_item" onClick={()=>navigate(`/account/manager/${id}`)} >
                <SiGoogleclassroom />
                <p>Room</p>
            </div>
            <div className="cd_item" onClick={()=>navigate(`/account/message`)}>
                <TbBrandCampaignmonitor />
                <p>Message</p>
            </div>
            <div className="cd_item" onClick={()=>navigate(`/account/managerDashboard/${id}`)}>
                <AiOutlineDashboard />
                <p>Dashboard</p>
            </div>
        </div>
    )
}

export default SidebarHotel;