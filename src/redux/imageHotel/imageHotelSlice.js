import { createSlice } from "@reduxjs/toolkit";
import { createIamgeHotel } from "./imageHotelThunk";
const initialState ={
    loading: false,
    error: {},
    data: [],
}

const imageHotelSlice = createSlice({
    name: "imageHotel",
    initialState,
    reducers:{
    },
    extraReducers: (builder) => {
        builder
            .addCase(createIamgeHotel.pending, (state) => {
                state.loading = true
            })
            .addCase(createIamgeHotel.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload
            })
            .addCase(createIamgeHotel.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })

    }
});

export default imageHotelSlice.reducer