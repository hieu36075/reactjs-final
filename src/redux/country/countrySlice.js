import { createSlice } from "@reduxjs/toolkit";
import { getCountry, getTopHotelInCountry } from "./countryThunks";


const initialState ={
    loading: 'loading',
    error: {},
    data: [],
}

const countrySlice = createSlice({
    name: "country",
    initialState,
    reducers:{
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCountry.pending, (state) => {
                state.loading = "pending"
            })
            .addCase(getCountry.fulfilled, (state, action) => {
                state.loading = "success"
                state.data = action.payload
                state.error = ""
            })
            .addCase(getCountry.rejected, (state, action) => {
                state.error = action.payload
            })
            .addCase(getTopHotelInCountry.fulfilled,(state, action) =>{
                state.data = action.payload
            })
    }
});

export default countrySlice.reducer