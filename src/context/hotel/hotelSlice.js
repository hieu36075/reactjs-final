import { createSlice } from "@reduxjs/toolkit";
import { getHotels } from "./hotelThunks";

const initialState ={
    loading: 'loading',
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
            state.loading = "pending"
        });
        builder.addCase(getHotels.fulfilled, (state, action) => {
            state.loading = "success"
            console.log(action.payload)
            state.data = action.payload.data
            state.error = ""
        });
        builder.addCase(getHotels.rejected, (state, action) => {
            console.log(action.payload)
            state.error = action.payload
        });

        
    }
});

export default hotelSlice.reducer
