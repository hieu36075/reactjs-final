import authSlice from "../context/auth/authSlice";
import { combineReducers } from "@reduxjs/toolkit";
const { configureStore } = require("@reduxjs/toolkit");

const reducer = combineReducers({
      auth: authSlice
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