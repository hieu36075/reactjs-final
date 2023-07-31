
import { createAsyncThunk } from "@reduxjs/toolkit";
import http from "../../services/axios-interceptor";
import useAlert from "../../context/aleart/useAlert";
export const login = createAsyncThunk('auth/login', async(data, {rejectWithValue})=>{
    try {
        const reponse = await http.post('auth/login', data)
        localStorage.setItem("token", reponse.accessToken)
        return reponse.accessToken
    } catch (error) {
        return rejectWithValue(error.message)
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