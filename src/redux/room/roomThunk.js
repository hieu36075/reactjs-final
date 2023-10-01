import { createAsyncThunk } from "@reduxjs/toolkit";
import http from "../../services/axios-interceptor";

export const createRoom = createAsyncThunk('room/createRoom', async(room, {rejectWithValue})=>{
    try {

        const reponse = await http.post(`/room`, room)

        return reponse
    } catch (error) {
        return rejectWithValue(error)
    }
})

export const getRoomByCategoryId = createAsyncThunk('room/getRoomByCategoryId', async(id, {rejectWithValue})=>{
    try {
        const reponse = await http.get(`/room&id=${id}`)
        return reponse
    } catch (error) {
        return rejectWithValue(error)
    }
})