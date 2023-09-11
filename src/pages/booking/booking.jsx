import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import AddressLink from "../AddressLink";
import PlaceGallery from "../PlaceGallery";
import BookingDates from "../BookingDates";
import { useDispatch } from "react-redux";
import { getHotelByRoom } from "../../redux/hotel/hotelThunks";


export default function BookingPage() {
  const {id} = useParams();
  const dispatch = useDispatch()
  const [booking,setBooking] = useState(null);
  useEffect(() => {
    if (id) {
      dispatch(getHotelByRoom(id))
    }
  }, [id]);

  if (!booking) {
    return '';
  }

  return (
    // <div className="my-8">
    //   <h1 className="text-3xl">{booking.place.title}</h1>
    //   <AddressLink className="my-2 block">{booking.place.address}</AddressLink>
    //   <div className="bg-gray-200 p-6 my-6 rounded-2xl flex items-center justify-between">
    //     <div>
    //       <h2 className="text-2xl mb-4">Your booking information:</h2>
    //       <BookingDates booking={booking} />
    //     </div>
    //     <div className="bg-primary p-6 text-white rounded-2xl">
    //       <div>Total price</div>
    //       <div className="text-3xl">${booking.price}</div>
    //     </div>
    //   </div>
    //   <PlaceGallery place={booking.place} />
    // </div>
    <div className="my-8">
    <h1 className="text-3xl">booking.place</h1>
    <AddressLink className="my-2 block">booking.adress</AddressLink>
    <div className="bg-gray-200 p-6 my-6 rounded-2xl flex items-center justify-between">
      <div>
        <h2 className="text-2xl mb-4">Your booking information:</h2>
        <BookingDates booking={booking} />
      </div>
      <div className="bg-primary p-6 text-white rounded-2xl">
        <div>Total price</div>
        <div className="text-3xl">$bookingprice </div>
      </div>
    </div>
    <PlaceGallery place={booking.place} />
  </div>
  );
}