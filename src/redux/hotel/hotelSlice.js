import { createSlice } from "@reduxjs/toolkit";
import { createHotel, getHotelByCategory, getHotelByCountry, getHotelById, getHotelByRoom, getHotelByUserId, getHotels, searchHotel, uploadMultiImangeHotel } from "./hotelThunks";

const initialState ={
    loading: false,
    error: {},
    data: [],
    details: [],
    page:[],
    image:[]
}

const hotelSlice = createSlice({
    name: "hotel",
    initialState,
    reducers:{
    },
    extraReducers: builder =>{
        builder.addCase(getHotels.pending, (state, action) => {
            state.loading = true
        });
        builder.addCase(getHotels.fulfilled, (state, action) => {
            state.loading = false
            state.data = action.payload
            state.error = ""
        });
        builder.addCase(getHotels.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        });
        //
        builder.addCase(getHotelByCountry.pending, (state, action) =>{
            state.loading = true
            
        });
        builder.addCase(getHotelByCountry.fulfilled, (state,action)=>{
            state.loading = false
            state.data = action.payload
        })
        //
        builder.addCase(getHotelByCategory.pending, (state, action) =>{
            state.loading = true
            
        });
        builder.addCase(getHotelByCategory.fulfilled, (state,action)=>{
            state.loading = false
            state.data = action.payload
        })
        //
        builder.addCase(searchHotel.pending, (state, action) => {
            state.loading = true
        });
        builder.addCase(searchHotel.fulfilled, (state, action) => {
            state.loading = false
            state.data = action.payload
            state.error = ""
        });
        builder.addCase(searchHotel.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        });
        //
        builder.addCase(getHotelById.pending, (state, action) => {
            state.loading = true
        });
        builder.addCase(getHotelById.fulfilled, (state, action) => {
            state.loading = false
            state.details = action.payload
            state.error = ""
        });
        builder.addCase(getHotelById.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        });

        //
        builder.addCase(getHotelByUserId.pending, (state, action) => {
            state.loading = true
        });
        builder.addCase(getHotelByUserId.fulfilled, (state, action) => {
            state.loading = false
            state.data = action.payload
            state.error = ""
        });
        builder.addCase(getHotelByUserId.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        });
        //
        builder.addCase(createHotel.pending, (state, action) => {
            state.loading = true
        });
        builder.addCase(createHotel.fulfilled, (state, action) => {
            state.loading = false
            state.data.data.pust(action.payload) 
            state.error = ""
        });
        builder.addCase(createHotel.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        });
        //
        builder.addCase(uploadMultiImangeHotel.pending, (state, action) => {
            state.loading = true
        });
        builder.addCase(uploadMultiImangeHotel.fulfilled, (state, action) => {
            state.loading = false
            state.image = action.payload
            state.error = ""
        });
        builder.addCase(uploadMultiImangeHotel.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        });

        builder.addCase(getHotelByRoom.pending, (state, action) => {
            state.loading = true
        });
        builder.addCase(getHotelByRoom.fulfilled, (state, action) => {
            state.loading = false
            state.image = action.payload
            state.error = ""
        });
        builder.addCase(getHotelByRoom.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        });
    }
});

export default hotelSlice.reducer
