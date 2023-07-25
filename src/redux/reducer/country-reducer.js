import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  list_country:[]
}

const countryReducer = createSlice({
  name: "countryReducer",
  initialState,
  reducers: {
    getListTopCountryInHotelReducer:(state,action)=>{
      state.list_country = action.payload
    },
  }
});

export const {getListTopCountryInHotelReducer} = countryReducer.actions

export default countryReducer.reducer