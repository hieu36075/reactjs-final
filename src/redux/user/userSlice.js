import { createSlice } from "@reduxjs/toolkit";
import { getUserThisMonth, getUsers, getUsersById, getYourProfile } from "./userThunks";


const initialState ={
    loading: false,
    error: {},
    data: [],
    details: [],
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers:{
    },
    extraReducers: builder =>{
        builder.addCase(getUsers.pending, (state, action) => {
            state.loading = false
        });
        builder.addCase(getUsers.fulfilled, (state, action) => {
            state.loading = true
            state.data = action.payload
            state.error = ""
        });
        builder.addCase(getUsers.rejected, (state, action) => {
            state.isLogin = true;
            state.error = action.payload
        });
        //
        builder.addCase(getYourProfile.pending, (state, action) => {
            state.loading = true
        });
        builder.addCase(getYourProfile.fulfilled, (state, action) => {
            state.loading = false
            state.data = action.payload
            state.error = ""
        });
        builder.addCase(getYourProfile.rejected, (state, action) => {
            state.isLogin = true;
            state.error = action.payload
        });
        //
        builder.addCase(getUsersById.pending, (state, action) => {
            state.loading = true
        });
        builder.addCase(getUsersById.fulfilled, (state, action) => {
            state.loading = false
            state.details = action.payload
            state.error = ""
        });
        builder.addCase(getUsersById.rejected, (state, action) => {
            state.isLogin = true;
            state.error = action.payload
        });
        //
        builder.addCase(getUserThisMonth.pending, (state, action) => {
            state.loading = true
        });
        builder.addCase(getUserThisMonth.fulfilled, (state, action) => {
            state.loading = false
            state.data = action.payload
            state.error = ""
        });
        builder.addCase(getUserThisMonth.rejected, (state, action) => {
            state.isLogin = true;
            state.error = action.payload
        });
    }
});

export default userSlice.reducer
