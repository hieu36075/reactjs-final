import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../api";

export const login = createAsyncThunk('auth/login', async( data,{rejectWithValue})=>{
    console.log(data)
    try{
        const reponse = await instance.post('auth/login', data)
        localStorage.setItem("token", reponse.data.accessToken);
        
        return reponse.data.accessToken;
    }
    catch(error){
        return rejectWithValue(error.reponse)
    }
})

export const loginByGoogle = createAsyncThunk('auth/loginByGoogle', async(token, {rejectWithValue})=>{
    try{
        const response = await instance.post('auth/login/google', token);
        const data = response.data;
        localStorage.setItem("AuthData", JSON.stringify(data));
        return data;
    }
    catch(error){
        return rejectWithValue(error.reponse)
    }
})