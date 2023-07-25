import authSlice from "../context/auth/authSlice";
import { combineReducers } from "@reduxjs/toolkit";
import hotelSlice from "../context/hotel/hotelSlice";
import userSlice from "../context/user/userSlice";
import categorySlice from "../context/category/categorySlice";
import countrySlice from "../context/country/countrySlice";
const { configureStore } = require("@reduxjs/toolkit");

const reducer = combineReducers({
      auth: authSlice,
      hotel: hotelSlice,
      user: userSlice,
      category: categorySlice,
      country: countrySlice
})


const store = configureStore({
  reducer,
    // reducer: authSlice,
    // middleware: (getDefaultMiddleware) =>
    // getDefaultMiddleware({
    //   serializableCheck: false,
    // }),
});

export default store;