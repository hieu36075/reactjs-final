import { createAsyncThunk } from "@reduxjs/toolkit";
import http from "../../services/axios-interceptor";

export const getCommentByHotelId = createAsyncThunk('comment/getCommentByHotelId', async(data, {rejectWithValue}) =>{
    try{
        const {id, page, perPage} = data;
        const reponse = await http.get(`/comment/getByHotelId?id=${id}&page=${page}&perPage=${perPage}`);
        return reponse
    }catch(error){
        return rejectWithValue(error)
    }
})

export const getAllCommentByHotelId = createAsyncThunk('comment/getAllCommentByHotelId', async(data, {rejectWithValue}) =>{
    try{
        const {id} = data;
        const reponse = await http.get(`/comment/${id}/hotel`);
        return reponse
    }catch(error){
        return rejectWithValue(error)
    }
})

export const addComment = createAsyncThunk('comment/addComment', async(data, {rejectWithValue}) =>{
    try{
        const reponse = await http.post(`/comment`, data);
        return reponse
    }catch(error){
        return rejectWithValue(error)
    }
})

