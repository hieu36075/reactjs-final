
import {useEffect, useState} from "react";
// import PlaceImg from "../PlaceImg";
import {Link, useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../layout/navbar/navbar";
import { getHotelByUserId } from "../../redux/hotel/hotelThunks";
import { SelectAllHotel } from "../../redux/hotel/hotelSelect";

export default function MyHotelPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
//   const [bookings,setBookings] = useState([]);
const hotel = useSelector(SelectAllHotel)
    const {loading} = useSelector((state) => state.hotel)


  useEffect(() => {
    dispatch(getHotelByUserId({page: 1 , perPage: 5}))
  }, []);
  if(!loading){
    return <h1>loading ...</h1>
  }
  console.log(hotel)
  const handleNavigate=(id, categoryId)=>{
    if(hotel[0].categoryRooms.length === 0){
        navigate(`/hotels/new/${hotel[0].userId}`, {state:{form:1, hotelId: id, categoryId: categoryId}})
    }else if(hotel[0].rooms.length === 0){
        navigate(`/hotels/new/${hotel[0].userId}`, {state:{form:2, hotelId:id, categoryId: categoryId}})
    }
    else{
        navigate(`/account/bookings/${id}`)
    }
  }

  return (
    <>
    <Navbar/>
    <div>
        <h1> List Your Hotel</h1>
        {hotel?.length > 0 && hotel?.map(hotel => (
            <div key={hotel.id} className="border border-gray-300 p-4 mb-4 rounded-xl bg-gray-200" onClick={()=>handleNavigate(hotel.id, hotel.categoryId)}>
                <div className="w-48">
                <img src={hotel.images[0].url} alt="" style={{width:'400px', height:'200px' }}/>
                </div>
                <div className="py-3 pr-3 grow">
                <h2 className="text-xl">{hotel?.name}</h2>
                <div>
                    <h2>check-In Time: {hotel.checkInTime}</h2>
                    <h2>check-In out: {hotel.checkOutTime}</h2>
                </div>
                <div className="text-xl">
      
                   { hotel.rooms || hotel.categoryRooms ? (
                    <div className="flex gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m0-10.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.249-8.25-3.286zm0 13.036h.008v.008H12v-.008z" />
                    </svg>
                    <span className="text-2xl">
                        Status: chưa hoàn thành
                    </span>
                    </div>
                   ): ("")}
                </div>
                </div>
        </div>
        ))}
        </div>
    </>
  );
}