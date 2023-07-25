import { createSlice } from "@reduxjs/toolkit";
import { getCountry } from "./countryThunks";
import { getTopHotelInCountry } from "./countryThunks";

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
    extraReducers: builder =>{
        builder.addCase(getCountry.pending, (state, action) => {
            state.loading = "pending"
        });
        builder.addCase(getCountry.fulfilled, (state, action) => {
            state.loading = "success"
            
            state.data = action.payload
            state.error = ""
        });
        builder.addCase(getCountry.rejected, (state, action) => {
            console.log(action.payload)
            state.error = action.payload
        });
        //
        builder.addCase(getTopHotelInCountry.pending, (state, action) => {
            state.loading = "pending"
        });
        builder.addCase(getTopHotelInCountry.fulfilled, (state, action) => {
            state.loading = "success"
            console.log(action.payload)
            state.data = action.payload
            state.error = ""
        });
        builder.addCase(getTopHotelInCountry.rejected, (state, action) => {
            console.log(action.payload)
            state.error = action.payload
        });
    }
});

export default countrySlice.reducer
