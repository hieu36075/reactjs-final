import { createSlice } from "@reduxjs/toolkit";
import { login } from "./authThunks";

const initialState ={
    isLogin: true,  
    loading: 'loading',
    error: {},
    token: []
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers:{
        logout:(state,action)=>{
            localStorage.removeItem('token')
        }
    },
    extraReducers: builder =>{
        builder.addCase(login.pending, (state, action) => {
            state.isLogin = true;
            state.loading = "pending"
        });
        builder.addCase(login.fulfilled, (state, action) => {
            state.isLogin = false;
            state.loading = "success"
            state.token = action.payload
        });
        builder.addCase(login.rejected, (state, action) => {
            state.isLogin = true;
            state.error = action.payload
        });
    }
});

