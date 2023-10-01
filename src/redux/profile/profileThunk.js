import { createAsyncThunk } from "@reduxjs/toolkit";
import http from "../../services/axios-interceptor";

export const getMyProfile = createAsyncThunk('room/getMyProfile', async(room, {rejectWithValue})=>{
    try {
        const reponse = await http.get(`/profile`)
        return reponse
    } catch (error) {
        return rejectWithValue(error)
    }
})

export const getProfileById = createAsyncThunk('room/getProfileById', async(userId, {rejectWithValue})=>{
    try {
        const reponse = await http.get(`/profile/${userId}`)
        return reponse
    } catch (error) {
        return rejectWithValue(error)
    }
})

