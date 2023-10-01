import { createSlice } from "@reduxjs/toolkit";
import { getMyProfile, getProfileById } from "./profileThunk";


const initialState ={
    loading: false,
    error: {},
    data: [],
}

const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers:{
    },
    extraReducers: (builder) => {
        builder
            .addCase(getMyProfile.pending, (state) => {
                state.loading = true
            })
            .addCase(getMyProfile.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload
                state.error = ""
            })
            .addCase(getMyProfile.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            .addCase(getProfileById.pending, (state) => {
                state.loading = true
            })
            .addCase(getProfileById.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload
                state.error = ""
            })
            .addCase(getProfileById.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })

            // .addCase(getRoomByCategoryId.pending, (state) => {
            //     state.loading = true
            // })
            // .addCase(getRoomByCategoryId.fulfilled, (state, action) => {
            //     state.loading = false
            //     state.data = action.payload
            //     state.error = ""
            // })
            // .addCase(getRoomByCategoryId.rejected, (state, action) => {
            //     state.loading = false
            //     state.error = action.payload
            // })
    }
});

export default profileSlice.reducer