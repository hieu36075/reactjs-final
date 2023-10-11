
import {useEffect, useState} from "react";
// import PlaceImg from "../PlaceImg";
import {Link} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOrderByUserId } from "../../redux/order/orderThunk";
import BookingItem from "../../components/bookingItem/BookingItem";
import Navbar from "../../layout/navbar/navbar";
import { AiOutlineShoppingCart } from 'react-icons/ai';


export default function BookingsPage() {
  const dispatch = useDispatch()
  
//   const [bookings,setBookings] = useState([]);
const bookings = useSelector((state) => state.order.data)
const {loading} = useSelector((state) => state.order)
  console.log(bookings)
  useEffect(() => {
    dispatch(getOrderByUserId({page: 1 , perPage: 5}))
  }, []);
  // if(bookings.length === 0){
  //   return <h1>loading ...</h1>
  // }
  return (
    <>
    <Navbar/>
        {bookings.length === 0 ?(
          <>
            <div className="flex flex-col h-[90vh] justify-center items-center ">

          <AiOutlineShoppingCart className="text-9xl " />
            <span className="text-xl ">co cai nit</span>
            </div>


          </>
          ) : (
            <div>
                <h1> list my booking </h1>
              {bookings?.length > 0 && bookings.map(booking => (
                  <div key={booking.id} className="border border-gray-300 p-4 mb-4 rounded-xl bg-gray-200">
                  <Link to={`/account/bookings/${booking._id}`} className="flex gap-4"> 
                      <div className="w-48">
                      <img src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1b/ed/95/07/limak-eurasia-luxury.jpg?w=700&h=-1&s=1" alt="" />
                      </div>
                      <div className="py-3 pr-3 grow">
                      <h2 className="text-xl">{booking?.orderdetails[0].room.name} in {booking?.orderdetails[0].room.hotel.name}</h2>
                      <div className="text-xl">
                          <BookingItem booking={booking} className="mb-2 mt-4 text-gray-500" />
                          <div className="flex gap-1">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                          </svg>
                          <span className="text-2xl">
                              Total price: ${booking.price}
                          </span>
                          </div>
                      </div>
                      </div>
                  </Link>
              </div>
              ))}
            </div>
            )}

    </>
  );
}