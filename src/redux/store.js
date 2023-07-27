import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "./auth/authSlice";
import hotelSlice from "./hotel/hotelSlice";
import countrySlice from "./country/countrySlice";
import userSlice from "./user/userSlice";
import categorySlice from "./category/categorySlice";
const { configureStore } = require("@reduxjs/toolkit");

const reducer = combineReducers({
  auth: authSlice,
  hotel: hotelSlice,
  country: countrySlice,
  user: userSlice,
  category: categorySlice

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