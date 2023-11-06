import { createAsyncThunk } from "@reduxjs/toolkit";
import http from "../../services/axios-interceptor";

export const getUsers = createAsyncThunk('user/getUsers', async(data, {rejectWithValue}) =>{
    try{
        const {page, perPage} = data;
        const reponse = await http.get(`/user?page=${page}&perPage=${perPage}`);
        return reponse
    }catch(error){
        return rejectWithValue(error)
    }
})

export const getMyUser = createAsyncThunk('user/getMyUser', async(_, {rejectWithValue}) =>{
    try{
        const reponse = await http.get(`/user/get-your-profile`);
        return reponse
    }catch(error){
        return rejectWithValue(error)
    }
})

export const getUsersById = createAsyncThunk('user/getUsersById', async(id, {rejectWithValue}) =>{
    try{
        const reponse = await http.get(`/user/${id}`);
        return reponse
    }catch(error){
        return rejectWithValue(error)
    }
})

export const getUserThisMonth = createAsyncThunk('user/getUserThisMonth', async(_,{rejectWithValue})=>{
    try {
        const reponse = await http.get(`/user/userInMonth`);
        return reponse
    } catch (error) {
        return rejectWithValue(error)
    }
})