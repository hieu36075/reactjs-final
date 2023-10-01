
import { createAsyncThunk } from "@reduxjs/toolkit";
import http from "../../services/axios-interceptor";

export const login = createAsyncThunk('auth/login', async(data, {rejectWithValue})=>{
    try {
        const reponse = await http.post('auth/login', data)

        return reponse
    } catch (error) {
        return rejectWithValue(error.message)
    }
})

export const register = createAsyncThunk('auth/register', async(data, {rejectWithValue})=>{
    try {
        const reponse = await http.post('auth/register', data)
        console.log(reponse)
        return reponse
    } catch (error) {
        return rejectWithValue(error.message)
    }
})
export const loginByGoogle = createAsyncThunk('auth/loginByGoogle', async(token, {rejectWithValue})=>{
    try {
        const response = await http.post('auth/login/google', token);
        const data = response.data;

        localStorage.setItem("AuthData", response.accessToken);
        return data;
    } catch (error) {
        return rejectWithValue(error.reponse)
    }
})