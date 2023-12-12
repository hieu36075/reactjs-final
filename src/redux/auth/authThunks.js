
import { createAsyncThunk } from "@reduxjs/toolkit";
import http from "../../services/axios-interceptor";
import { openMessage } from "../modal/modalSlice";

export const login = createAsyncThunk('auth/login', async(data, thunkApi)=>{
    try {
        const reponse = await http.post('auth/login', data)
        return reponse
    } catch (error) {
        if(error.statusCode ===403){
            thunkApi.dispatch(openMessage({message:"Your account is block! Please contact Admin", notificationType: 'error'}))
        }
        return thunkApi.rejectWithValue(error)
    }
})

export const register = createAsyncThunk('auth/register', async(data, {rejectWithValue})=>{
    try {
        const reponse = await http.post('auth/register', data)
        return reponse
    } catch (error) {
        return rejectWithValue(error)
    }
})
export const loginByGoogle = createAsyncThunk('auth/loginByGoogle', async(token,thunkApi)=>{
    try {
        const response = await http.post('auth/login/google', token);
        return response;
    } catch (error) {
        if(error.statusCode ===403){
            thunkApi.dispatch(openMessage({message:"Your account is block! Please contact Admin", notificationType: 'error'}))
        }
        return thunkApi.rejectWithValue(error)
    }
})