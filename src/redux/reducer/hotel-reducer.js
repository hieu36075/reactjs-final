import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  list_hotel_by_country:[]
}

const hotelReducer = createSlice({
  name: "hotelReducer",
  initialState,
  reducers: {
    getListHotelReducer:(state,action)=>{
      state.list_hotel_by_country = action.payload
    },
    getListHotelByCountryReducer:(state,action)=>{
      state.list_hotel_by_country = action.payload
    }
  }
});

export const {getListHotelReducer, getListHotelByCountryReducer} = hotelReducer.actions

export default hotelReducer.reducer