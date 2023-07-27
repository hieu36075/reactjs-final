
import { createSlice } from "@reduxjs/toolkit";
import { login, loginByGoogle } from "./authThunks";


const initialState ={
    isLogin: false,  
    loading: false,
    error: {},
    token: []
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers:{
        logout:(state,action)=>{
            localStorage.removeItem('token')
        }
    },
    extraReducers: builder=>{
        builder.addCase(login.pending, (state, action)=>{
            state.isLogin=true
            state.loading=true
        }) 
        builder.addCase(login.fulfilled, (state, action) =>{
            state.isLogin= false
            state.loading=false
            state.token = action.payload
        })
        builder.addCase(login.rejected, (state,action) =>{
            state.isLogin= false
            state.loading= false
            state.error = action.payload
        })
        builder.addCase(loginByGoogle.pending,(state,action)=>{
            state.isLogin=true
            state.loading=true
        })
        builder.addCase(loginByGoogle.fulfilled,(state,action)=>{
            state.isLogin= false
            state.loading=false
            state.token = action.payload
        })
        builder.addCase(loginByGoogle.rejected, (state,action)=>{
            state.isLogin= false
            state.loading= false
            state.error = action.payload
        })
    }
});
export default authSlice.reducer