import { createAsyncThunk } from "@reduxjs/toolkit";
import http from "../../services/axios-interceptor";

export const getCountry = createAsyncThunk('country/getCountry', async(data, {rejectWithValue}) =>{
    try{
        const {page, perPage} = data;
        const reponse = await http.get(`/country?page=${page}&perPage=${perPage}`);
        return reponse
    }catch(error){
        return rejectWithValue(error)
    }
})

export const getTopHotelInCountry = createAsyncThunk('country/getTopHotelInCountry', async(data,{rejectWithValue})=>{
    try {
        const {page, perPage} = data;
        const reponse = await http.get(`/country/topCountry?page=${page}&perPage=${perPage}`)
        return reponse
    } catch (error) {
        return rejectWithValue(error)
    }
})