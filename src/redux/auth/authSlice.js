
import { createSlice } from "@reduxjs/toolkit";
import { login, loginByGoogle, register } from "./authThunks";


const initialState ={
    isLogin: false, 
    loading: false,
    error: '',
    token: []
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers:{
        logOut:(state,action)=>{
            localStorage.removeItem('token')
            state.isLogin = false;
            window.location.href ="/"
        },
        setIsLogin: (state, action) => {
            state.isLogin = action.payload;
        },
        setToken:(state,action)=>{
            state.token = action.payload
        }
    },
    extraReducers: builder=>{
        builder.addCase(login.pending,(state,action)=>{
            state.error = ''
        })
        builder.addCase(login.fulfilled, (state, action) =>{
            state.loading=false
            state.token = action.payload
            state.token = action.payload.access_token
            localStorage.setItem("token",action.payload.access_token)
            localStorage.setItem("rfToken",action.payload.refresh_token)
            state.isLogin= true
            state.error = ''
        })
        builder.addCase(login.rejected, (state,action) =>{
            state.loading= false
            state.error = action.payload
        })
        // builder.addCase(loginByGoogle.pending,(state,action)=>{
        //     state.isLogin=true
        //     state.loading=true
        // })
        builder.addCase(loginByGoogle.fulfilled,(state,action)=>{
            state.isLogin= true
            state.token = action.payload
            state.token = action.payload.access_token
            localStorage.setItem("token",action.payload.access_token)
            localStorage.setItem("rfToken",action.payload.refresh_token)
            state.loading=false
       
        })
        builder.addCase(loginByGoogle.rejected, (state,action)=>{
            state.loading= false
            state.error = action.payload
        })

        builder.addCase(register.pending,(state,action)=>{
            state.error = ''
        })
        builder.addCase(register.fulfilled, (state, action) =>{
            state.loading=false
            state.token = action.payload
            state.token = action.payload.access_token
            localStorage.setItem("token",action.payload.access_token)
            localStorage.setItem("rfToken",action.payload.refresh_token)
            state.isLogin= true
            state.error = ''
        })
        builder.addCase(register.rejected, (state,action) =>{
            state.loading= false
            state.error = action.payload
        })
    }
});

export const {setIsLogin, logOut,setToken } = authSlice.actions;
export default authSlice.reducer