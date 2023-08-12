import { createAsyncThunk } from "@reduxjs/toolkit";
import http from "../../services/axios-interceptor";

export const getCategoryRoom = createAsyncThunk('categoryRoom/getCategoryRoom', async(data, {rejectWithValue}) =>{
    try{
        const {page, perPage} = data;
        const reponse = await http.get(`/categoryRoom?page=${page}&perPage=${perPage}`);
        console.log(reponse.data)
        return reponse.data
    }catch(error){
        return rejectWithValue(error)
    }
})