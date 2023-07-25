import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./reducer/auth-reducer";
import hotelReducer from "./reducer/hotel-reducer";
import countryReducer from "./reducer/country-reducer";
const { configureStore } = require("@reduxjs/toolkit");

const reducer = combineReducers({
      authReducer,
      hotelReducer,
      countryReducer
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