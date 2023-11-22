import http from "../../services/axios-interceptor";
import { createAsyncThunk } from "@reduxjs/toolkit";


export const getRoomMessage = createAsyncThunk('roomMessage/createRoomMessage', async(room, {rejectWithValue})=>{
    try {
        const reponse = await http.get(`/roomMessage`)
        return reponse
    } catch (error) {
        return rejectWithValue(error)
    }
})

export const checkRoomMessage = createAsyncThunk('roomMessage/checkRoomMessage', async(data, {rejectWithValue})=>{
    const{senderId, receiveId}= data
    try {
        const reponse = await http.get(`/roomMessage/check-room?senderId=${senderId}&receiveId=${receiveId}`)
        return reponse
    } catch (error) {
        return rejectWithValue(error)
    }
})
export const getMessageByRoomId = createAsyncThunk('roomMessage/getMessageByRoomId', async(id, {rejectWithValue})=>{
    try {
        const reponse = await http.get(`/roomMessage/${id}`)
        return reponse
    } catch (error) {
        return rejectWithValue(error)
    }
})

export const getMyMessage = createAsyncThunk('roomMessage/getMyMessage', async(_, {rejectWithValue})=>{
    try {
        const reponse = await http.get(`/roomMessage/by-userId`)
        return reponse
    } catch (error) {
        return rejectWithValue(error)
    }
})