import { createSlice } from "@reduxjs/toolkit";
import { getUserThisMonth, getUsers, getUsersById, getMyUser, changeActive } from "./userThunks";


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
            state.loading = true
        });
        builder.addCase(getUsers.fulfilled, (state, action) => {
            state.loading = false
            state.data = action.payload
    
            state.error = ""
        });
        builder.addCase(getUsers.rejected, (state, action) => {
            state.isLogin = false;
            state.error = action.payload
        });
        //
        builder.addCase(getMyUser.pending, (state, action) => {
            state.loading = true
        });
        builder.addCase(getMyUser.fulfilled, (state, action) => {
            state.loading = false
            state.data = action.payload
            state.error = ""
        });
        builder.addCase(getMyUser.rejected, (state, action) => {
            state.isLogin = false;
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
            state.isLogin = false;
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
            state.isLogin = false;
            state.error = action.payload
        });

        builder.addCase(changeActive.pending, (state, action) => {
            state.loading = true
        });
        builder.addCase(changeActive.fulfilled, (state, action) => {
            state.loading = false
            const currenUser = state.data.data.filter((item) => item.id !== action.payload.id)
            state.data.data = [...currenUser, action.payload]
            state.error = ""
        });
        builder.addCase(changeActive.rejected, (state, action) => {
            state.isLogin = false;
            state.error = action.payload
        });
    }
});

export default userSlice.reducer
