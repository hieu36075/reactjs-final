// import { createAsyncThunk } from "@reduxjs/toolkit";
// import http from "../../services/axios-interceptor";

// export const login = createAsyncThunk('auth/login', async( data,{rejectWithValue})=>{
//     try{
//         const reponse = await http.post('auth/login', data)
//         localStorage.setItem("token", reponse.data.accessToken);
//         return reponse.data.accessToken;
//     }
//     catch(error){
//         return rejectWithValue(error.reponse)
//     }
// })

// export const loginByGoogle = createAsyncThunk('auth/loginByGoogle', async(token, {rejectWithValue})=>{
//     try{
//         const response = await http.post('auth/login/google', token);
//         const data = response.data;
//         localStorage.setItem("AuthData", JSON.stringify(data));
//         return data;
//     }
//     catch(error){
//         return rejectWithValue(error.reponse)
//     }
// })

import { createAsyncThunk } from "@reduxjs/toolkit";
import http from "../../services/axios-interceptor";

export const login = createAsyncThunk('auth/login', async(data, {rejectWithValue})=>{
    try {
        const reponse = await http.post('auth/login', data)
        localStorage.setItem("token", reponse.accessToken)
        return reponse.accessToken
    } catch (error) {
        return rejectWithValue(error.reponse)
    }
})

export const loginByGoogle = createAsyncThunk('auth/loginByGoogle', async(token, {rejectWithValue})=>{
    try {
        const response = await http.post('auth/login/google', token);
        const data = response.data;
        console.log(response.accessToken)
        localStorage.setItem("AuthData", response.accessToken);
        return data;
    } catch (error) {
        return rejectWithValue(error.reponse)
    }
})