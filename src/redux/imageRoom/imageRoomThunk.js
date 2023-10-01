import { createAsyncThunk } from "@reduxjs/toolkit";
import http from "../../services/axios-interceptor";

export const createImageRoom = createAsyncThunk('imageRoom/createImageRoom', async(image, {rejectWithValue})=>{

    try {
        const reponse = await http.post(`/imageRoom`, image)

        return reponse
    } catch (error) {
        return rejectWithValue(error)
    }
})