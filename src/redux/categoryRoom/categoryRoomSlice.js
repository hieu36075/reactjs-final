import { createSlice } from "@reduxjs/toolkit";
import { createCategoryRoom, getCategoryRoom, getCategoryRoomByHotel, updateCategoryRoom } from "./categoryRoomThunk";



const initialState = {
    loading: false,
    error: {},
    data: [],
    detail: []
}

const categoryRoomSlice = createSlice({
    name: "categoryRoom",
    initialState,
    reducers: {
        updateRoomInCategoryRoom: (state, action) => {
            const dataToUpdate = state.data.find(data => data.id === action.payload.categoryRoomId);
            const roomIndex = dataToUpdate.rooms.findIndex(room => room.id === action.payload.id);
            if (roomIndex !== -1) {
                state.data[roomIndex].rooms = state.data[roomIndex].rooms.map(item =>
                    item.id === action.payload.id ? action.payload : item
                );
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCategoryRoom.pending, (state) => {
                state.loading = true
            })
            .addCase(getCategoryRoom.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload
                state.error = ""
            })
            .addCase(getCategoryRoom.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            .addCase(createCategoryRoom.pending, (state) => {
                state.loading = true
            })
            .addCase(createCategoryRoom.fulfilled, (state, action) => {
                state.loading = false
                state.detail = action.payload
                state.error = ""
            })
            .addCase(createCategoryRoom.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            //
            .addCase(updateCategoryRoom.pending, (state) => {
                state.loading = true
            })
            .addCase(updateCategoryRoom.fulfilled, (state, action) => {
                state.loading = false
                state.data = state.data.map(item =>
                    item.id === action.payload.id ? action.payload : item
                );
                state.error = ""
            })
            .addCase(updateCategoryRoom.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            //
            .addCase(getCategoryRoomByHotel.pending, (state) => {
                state.loading = true
            })
            .addCase(getCategoryRoomByHotel.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload
                state.error = ""
            })
            .addCase(getCategoryRoomByHotel.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
    }
});
export const { updateRoomInCategoryRoom } = categoryRoomSlice.actions
export default categoryRoomSlice.reducer