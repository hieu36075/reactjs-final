import { createSlice } from "@reduxjs/toolkit";
import { getAmenity } from "./amenityThunks";
const initialState ={
    loading: false,
    error: {},
    data: [],
    page:[]
}

const amenitySlice = createSlice({
    name: "amenity",
    initialState,
    reducers:{
    },
    extraReducers: builder =>{
        builder.addCase(getAmenity.pending, (state, action) => {
            state.loading = true
        });
        builder.addCase(getAmenity.fulfilled, (state, action) => {
            state.loading = false
            state.data = action.payload
            state.error = ""
        });
        builder.addCase(getAmenity.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        });
        //
        // builder.addCase(addCategory.pending, (state, action) => {
        //     state.loading = true
        // });
        // builder.addCase(addCategory.fulfilled, (state, action) => {
        //     state.loading = false
        //     state.data.push(action.payload)
        //     state.error = ""
        // });
        // builder.addCase(addCategory.rejected, (state, action) => {
        //     state.loading = false
        //     state.error = action.payload
        // });
    }
});

export default amenitySlice.reducer
