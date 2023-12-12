import { createAsyncThunk } from "@reduxjs/toolkit";
import http from "../../services/axios-interceptor";
import { openMessage } from "../modal/modalSlice";

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



export const updateProfile = createAsyncThunk('room/updateProfile', async(data, thunkApi)=>{
    try {
        const reponse = await http.patch(`/profile/`, data)
        thunkApi.dispatch(openMessage({message:"Success change profile", notificationType: 'success'}))
        return reponse
    } catch (error) {
        thunkApi.dispatch(openMessage({message:"Error change profile", notificationType: 'error'}))
        return thunkApi.rejectWithValue(error)
    }
})

export const uploadAvatar = createAsyncThunk('auth/uploadAvatar', async(file, {rejectWithValue})=>{
    try {
        const reponse = await http.post(`/auth/file-upload`, file)
        return reponse
        // return {message: 'true'}
    } catch (error) {
        return rejectWithValue(error)
    }
})
