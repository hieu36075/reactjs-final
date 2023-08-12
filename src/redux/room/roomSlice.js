import { createSlice } from "@reduxjs/toolkit";
import { createRoom } from "./roomThunk";

const initialState ={
    loading: false,
    error: {},
    data: [],
}

const roomSlice = createSlice({
    name: "room",
    initialState,
    reducers:{
    },
    extraReducers: (builder) => {
        builder
            .addCase(createRoom.pending, (state) => {
                state.loading = true
            })
            .addCase(createRoom.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload
                state.error = ""
            })
            .addCase(createRoom.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
    }
});

export default roomSlice.reducer