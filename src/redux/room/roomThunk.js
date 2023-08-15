import { createAsyncThunk } from "@reduxjs/toolkit";
import http from "../../services/axios-interceptor";

export const createRoom = createAsyncThunk('room/createRoom', async(room, {rejectWithValue})=>{
    try {
        console.log("a",room)
        const reponse = await http.post(`/room`, room)
        console.log(reponse)
        return reponse
    } catch (error) {
        return rejectWithValue(error)
    }
})