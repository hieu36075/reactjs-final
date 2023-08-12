import { combineReducers  } from "@reduxjs/toolkit";
import authSlice from "./auth/authSlice";
import hotelSlice from "./hotel/hotelSlice";
import countrySlice from "./country/countrySlice";
import userSlice from "./user/userSlice";
import categorySlice from "./category/categorySlice";
import jwtDecode from "jwt-decode";
import { setIsLogin } from "./auth/authSlice";
import notificationSlice from "./notification/notificationSlice";
import amenitySlice from "./amenity/amenitySlice";
import categoryRoomSlice from "./categoryRoom/categoryRoomSlice";
import imageHotelSlice from "./imageHotel/imageHotelSlice";
import citySlice from "./city/citySlice";
import roomSlice from "./room/roomSlice";
import imageRoomSlice from "./imageRoom/imageRoomSlice";
const { configureStore } = require("@reduxjs/toolkit");

const checkTokenExpiration = (store) => {
  const token = localStorage.getItem("token");
  if (token) {
    const decodedToken = jwtDecode(token);
    const currentDate = new Date().getTime();
    const isTokenExpired = decodedToken.exp * 1000 < currentDate;
    store.dispatch(setIsLogin(!isTokenExpired));
  } else {
    store.dispatch(setIsLogin(false));
  }
};


const reducer = combineReducers({
  auth: authSlice,
  hotel: hotelSlice,
  country: countrySlice,
  user: userSlice,
  category: categorySlice,
  notification: notificationSlice,
  amenity: amenitySlice,
  categoryRoom: categoryRoomSlice,
  imageHotel: imageHotelSlice,
  city: citySlice,
  room: roomSlice,
  imageRoom: imageRoomSlice
})


const store = configureStore({
  reducer,
});
checkTokenExpiration(store);
export default store;