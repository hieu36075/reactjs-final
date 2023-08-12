import { createSlice } from "@reduxjs/toolkit";
import { getCityByCountryId } from "./cityThunk";

const initialState ={
    loading: false,
    error: {},
    data: [],
}

const citySlice = createSlice({
    name: "city",
    initialState,
    reducers:{
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCityByCountryId.pending, (state) => {
                state.loading = true
            })
            .addCase(getCityByCountryId.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload
            })
            .addCase(getCityByCountryId.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })

    }
});

export default citySlice.reducer