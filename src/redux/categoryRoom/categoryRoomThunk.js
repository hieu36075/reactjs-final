import { createAsyncThunk } from "@reduxjs/toolkit";
import http from "../../services/axios-interceptor";

export const getCategoryRoom = createAsyncThunk('categoryRoom/getCategoryRoom', async(data, {rejectWithValue}) =>{
    try{
        const {page, perPage} = data;
        const reponse = await http.get(`/categoryRoom?page=${page}&perPage=${perPage}`);

        return reponse.data
    }catch(error){
        return rejectWithValue(error)
    }
})

export const getCategoryRoomByHotel = createAsyncThunk('categoryRoom/getCategoryRoomByHotel', async(data, {rejectWithValue}) =>{
    try{
        const {id, page, perPage} = data;
        const reponse = await http.get(`/categoryRoom/get-by-hotel?hotelId=${id}&page=${page}&perPage=${perPage}`);
        return reponse.data
    }catch(error){
        return rejectWithValue(error)
    }
})


export const createCategoryRoom = createAsyncThunk('categoryRoom/createCategoryRoom', async(data, {rejectWithValue}) =>{
    try{
        const reponse = await http.post(`/categoryRoom` , data);
        return reponse
    }catch(error){
        return rejectWithValue(error)
    }
})