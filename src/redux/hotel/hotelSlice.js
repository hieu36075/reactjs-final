import { createSlice } from "@reduxjs/toolkit";
import { getHotelByCategory, getHotelByCountry, getHotels, searchHotel } from "./hotelThunks";

const initialState ={
    loading: true,
    error: {},
    data: [],
    page:[]
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
            state.error = action.payload
        });
        
    }
});

export default hotelSlice.reducer