import { createSlice } from "@reduxjs/toolkit";
import { createImageRoom } from "./imageRoomThunk";
const initialState ={
    loading: false,
    error: {},
    data: [],
}

const imageRoomSlice = createSlice({
    name: "imageRoom",
    initialState,
    reducers:{
    },
    extraReducers: (builder) => {
        builder
            .addCase(createImageRoom.pending, (state) => {
                state.loading = true
            })
            .addCase(createImageRoom.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload
            })
            .addCase(createImageRoom.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })

    }
});

export default imageRoomSlice.reducer