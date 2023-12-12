
import Navbar from "../../../layout/navbar/Navbar";
import { useState } from "react";
import ManagerRoom from "./ManagerRoom";
import HotelDashboard from "../dashboard/HotelDashboard";


export default function ManagerHotel() {
    const [type, setType] = useState('current')
    const handleChangeType = (currentType)=>{
        setType(currentType)
    }
  

  return (
    <div>
      <Navbar />
      <div>
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
            }}
          >
            Dashboard
          </button>
        </nav>
      </div>
      </div>
        {type === 'current' 
        ?  <ManagerRoom/>
        : <HotelDashboard/>
    }
    </div>
  );
}
