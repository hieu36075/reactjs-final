import { createSlice } from "@reduxjs/toolkit";
import { createRoom, deleteRoom, getRoomById, updateRoom } from "./roomThunk";

const initialState ={
    loading: false,
    error: {},
    data: [],
    details: [],
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
                state.data.push(action.payload)
                state.error = ""
            })
            .addCase(createRoom.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })

            .addCase(updateRoom.pending, (state) => {
                state.loading = true
            })
            .addCase(updateRoom.fulfilled, (state, action) => {
                state.loading = false
                state.details = action.payload
                state.error = ""
            })
            .addCase(updateRoom.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })

            .addCase(getRoomById.pending, (state) => {
                state.loading = true
            })
            .addCase(getRoomById.fulfilled, (state, action) => {
                state.loading = false
                state.details = action.payload

                state.error = ""
            })
            .addCase(getRoomById.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })

            .addCase(deleteRoom.pending, (state) => {
                state.loading = true
            })
            .addCase(deleteRoom.fulfilled, (state, action) => {
                state.loading = false
                const {id} = action.payload
                state.data = state.data.filter((item) => item.id !== id);
                state.error = ""
            })
            .addCase(deleteRoom.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
    }
});

export default roomSlice.reducer