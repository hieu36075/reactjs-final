import "./SidebarHotel.css"
import { AiOutlineHome, AiOutlineDashboard } from 'react-icons/ai';
import { TbBrandCampaignmonitor } from 'react-icons/tb';
import { SiGoogleclassroom } from 'react-icons/si';


const SidebarHotel = () => {
    return (
        <div className="cd-box">
            <div className="cd_item">
                <AiOutlineHome className="icon"/>
                <p>Home</p>
            </div>
            <div className="cd_item">
                <SiGoogleclassroom />
                <p>Room</p>
            </div>
            <div className="cd_item">
                <TbBrandCampaignmonitor />
                <p>Campaign</p>
            </div>
            <div className="cd_item">
                <AiOutlineDashboard />
                <p>Dashboard</p>
            </div>
        </div>
    )
}

export default SidebarHotel;