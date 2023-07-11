import { createSlice } from "@reduxjs/toolkit";
import { getUsers } from "./userThunks";


const initialState ={
    isLogin: false,  
    loading: 'loading',
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
            state.loading = "pending"
        });
        builder.addCase(getUsers.fulfilled, (state, action) => {
            state.isLogin = false;
            state.loading = "success"
            console.log(action.payload)
            state.data = action.payload
            state.error = ""
        });
        builder.addCase(getUsers.rejected, (state, action) => {
            state.isLogin = true;
            console.log(action.payload)
            state.error = action.payload
        });

        
    }
});

export default userSlice.reducer
