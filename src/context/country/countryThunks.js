import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../api";

export const getCountry = createAsyncThunk('country/getCountry', async(_, {rejectWithValue}) =>{
    try{
        const reponse = await instance.get(`/country`);
        return reponse.data
    }catch(error){
        return rejectWithValue(error)
    }
})

export const getTopHotelInCountry = createAsyncThunk('country/getTopHotelInCountry', async(_, {rejectWithValue}) =>{
    try{
        const reponse = await instance.get(`/country/topCountry`);
        return reponse.data
    }catch(error){
        return rejectWithValue(error)
    }
})