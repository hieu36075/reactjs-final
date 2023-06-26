import { authSlice } from "../redux-toolkit/auth/authSlice";

const { configureStore } = require("@reduxjs/toolkit");

const store = configureStore({
    reducer: authSlice,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;