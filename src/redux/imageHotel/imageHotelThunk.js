import { createAsyncThunk } from "@reduxjs/toolkit";
import http from "../../services/axios-interceptor";

export const createIamgeHotel = createAsyncThunk('imageHotel/createIamgeHotel', async(image, {rejectWithValue})=>{
    console.log(image)
    try {
        const reponse = await http.post(`/imageHotel`, image)
        console.log(reponse)
        return reponse
    } catch (error) {
        return rejectWithValue(error)
    }
})