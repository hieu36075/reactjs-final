import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../api";

export const login = createAsyncThunk('auth/login', async( data,{rejectWithValue})=>{
    try{
        const reponse = await instance.post('auth/login', data)
        localStorage.setItem("token", reponse.data.accessToken);
        return reponse;
    }
    catch(error){
        console.log("c")
        return rejectWithValue(error.reponse)
    }
})