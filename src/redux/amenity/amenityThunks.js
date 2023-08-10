import { createAsyncThunk } from "@reduxjs/toolkit";
import http from "../../services/axios-interceptor";

export const getAmenity = createAsyncThunk('category/getAmenity', async(_, {rejectWithValue}) =>{
    try{
        const reponse = await http.get(`/amenity`);
        console.log(reponse)
        return reponse
    }catch(error){
        return rejectWithValue(error)
    }
})