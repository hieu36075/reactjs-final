import { createAsyncThunk } from "@reduxjs/toolkit";
import http from "../../services/axios-interceptor";


export const checkDateByRoom = createAsyncThunk('orderDetails/checkDateByRoom', async(id, {rejectWithValue}) =>{
    try{
        const reponse = await http.get(`/orderDetails/checkDateByRoom/${id}`);
        return reponse
    }catch(error){
        return rejectWithValue(error)
    }
})