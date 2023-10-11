import { createSlice } from "@reduxjs/toolkit";
import { getMyProfile, getProfileById, updateProfile, uploadAvatar } from "./profileThunk";


const initialState ={
    loading: false,
    error: {},
    data: [],
    details: [],
    image: []
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
                state.details = action.payload
                state.loading = false
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
                state.data = action.payload
                state.loading = false
                state.error = ""
            })
            .addCase(getProfileById.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })

            .addCase(updateProfile.pending, (state) => {
                state.loading = true
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.loading = false
                state.details = action.payload
                state.error = ""
            })
            .addCase(updateProfile.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })

            .addCase(uploadAvatar.pending, (state) => {
                state.loading = true
            })
            .addCase(uploadAvatar.fulfilled, (state, action) => {
                state.loading = false
                state.image = action.payload
                state.error = ""
            })
            .addCase(uploadAvatar.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })


    }
});

export default profileSlice.reducer