import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  list_hotel:[]
  
}

const hotelReducer = createSlice({
  name: "hotelReducer",
  initialState,
  reducers: {
    getListHotelReducer:(state,action)=>{
      state.list_hotel = action.payload
    },
    getListHotelByCountryReducer:(state,action)=>{
      state.list_hotel= action.payload
    },
    getListHotelByCategoryReducer:(state,action)=>{
    
    }
  }
});

export const {getListHotelReducer, getListHotelByCountryReducer} = hotelReducer.actions

export default hotelReducer.reducer