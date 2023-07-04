import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../api";

export const login = createAsyncThunk('auth/login', async( data,{rejectWithValue})=>{
    try{
        const reponse = await instance.post('auth/login', data)
        localStorage.setItem("token", reponse.data.accessToken);
        return reponse.data.accessToken;
    }
    catch(error){
        console.log("c")
        return rejectWithValue(error.reponse)
    }
})

export const loginByGoogle = createAsyncThunk('auth/loginByGoogle', async({rejectWithValue})=>{
    try{
        const reponse = await instance.get('auth/google/login')
        return reponse.data;
    }
    catch(error){
        console.log("c")
        return rejectWithValue(error.reponse)
    }
})