
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
        return reponse
    } catch (error) {
        return rejectWithValue(error.message)
    }
})
export const loginByGoogle = createAsyncThunk('auth/loginByGoogle', async(token, {rejectWithValue})=>{
    try {
        const response = await http.post('auth/login/google', token);
        return response;
    } catch (error) {
        return rejectWithValue(error.reponse)
    }
})