import { createAsyncThunk } from "@reduxjs/toolkit";
import http from "../../services/axios-interceptor";

export const createImageRoom = createAsyncThunk('imageRoom/createImageRoom', async(image, {rejectWithValue})=>{
    console.log(image)
    try {
        const reponse = await http.post(`/imageRoom`, image)
        console.log(reponse)
        return reponse
    } catch (error) {
        return rejectWithValue(error)
    }
})