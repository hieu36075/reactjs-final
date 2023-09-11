import { createSlice } from "@reduxjs/toolkit";
import { createCategoryRoom, getCategoryRoom, getCategoryRoomByHotel } from "./categoryRoomThunk";
import { getHotelByCategory } from "../hotel/hotelThunks";


const initialState ={
    loading: false,
    error: {},
    data: [],
    detail:[]
}

const categoryRoomSlice = createSlice({
    name: "categoryRoom",
    initialState,
    reducers:{
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCategoryRoom.pending, (state) => {
                state.loading = false
            })
            .addCase(getCategoryRoom.fulfilled, (state, action) => {
                state.loading = true
                state.data = action.payload
                state.error = ""
            })
            .addCase(getCategoryRoom.rejected, (state, action) => {
                state.error = action.payload
            })
            .addCase(createCategoryRoom.pending, (state) => {
                state.loading = false
            })
            .addCase(createCategoryRoom.fulfilled, (state, action) => {
                state.loading = true
                state.detail = action.payload
                state.error = ""
            })
            .addCase(createCategoryRoom.rejected, (state, action) => {
                state.error = action.payload
            })
            //
            .addCase(getCategoryRoomByHotel.pending, (state) => {
                state.loading = false
            })
            .addCase(getCategoryRoomByHotel.fulfilled, (state, action) => {
                state.loading = true
                state.data = action.payload
                state.error = ""
            })
            .addCase(getCategoryRoomByHotel.rejected, (state, action) => {
                state.error = action.payload
            })
    }
});

export default categoryRoomSlice.reducer