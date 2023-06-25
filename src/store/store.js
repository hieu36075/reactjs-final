import { authSlice } from "../slices/authSlice";

const { configureStore } = require("@reduxjs/toolkit");

const store = configureStore({
    reducer: authSlice,
});

export default store;