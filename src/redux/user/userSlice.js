import { createSlice } from "@reduxjs/toolkit";
import { getUsers } from "./userThunks";


const initialState ={
    isLogin: false,  
    loading: false,
    error: {},
    data: [],
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers:{
    },
    extraReducers: builder =>{
        builder.addCase(getUsers.pending, (state, action) => {
            state.isLogin = true;
            state.loading = true
        });
        builder.addCase(getUsers.fulfilled, (state, action) => {
            state.isLogin = false
            state.loading = false
            state.data = action.payload
            state.error = ""
        });
        builder.addCase(getUsers.rejected, (state, action) => {
            state.isLogin = true;
            state.error = action.payload
        });

        
    }
});

export default userSlice.reducer
