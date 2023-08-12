import { createAsyncThunk } from "@reduxjs/toolkit";
import http from "../../services/axios-interceptor";

export const getAmenity = createAsyncThunk('amenity/getAmenity', async(_, {rejectWithValue}) =>{
    try{
        const reponse = await http.get(`/amenity`);
        return reponse
    }catch(error){
        return rejectWithValue(error)
    }
})