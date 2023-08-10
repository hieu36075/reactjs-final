import { createAsyncThunk } from "@reduxjs/toolkit";
import http from "../../services/axios-interceptor";

export const getCountry = createAsyncThunk('country/getCountry', async(_, {rejectWithValue}) =>{
    try{
        const reponse = await http.get(`/country`);
        return reponse
    }catch(error){
        return rejectWithValue(error)
    }
})

export const getTopHotelInCountry = createAsyncThunk('country/getTopHotelInCountry', async(_,{rejectWithValue})=>{
    try {
        const reponse = await http.get(`/country/topCountry`)
        return reponse
    } catch (error) {
        return rejectWithValue(error)
    }
})