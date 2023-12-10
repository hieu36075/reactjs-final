import { createAsyncThunk } from "@reduxjs/toolkit";
import http from "../../services/axios-interceptor";
import { updateRoomInCategoryRoom } from "../categoryRoom/categoryRoomSlice";

export const createRoom = createAsyncThunk('room/createRoom', async(room, {rejectWithValue})=>{
    try {
        const reponse = await http.post(`/room`, room)
        return reponse
    } catch (error) {
        console.log(error)
        return rejectWithValue(error)
    }
})

export const updateRoom = createAsyncThunk('room/updateRoom', async(room, thunkAPI)=>{
    const{id} = room
    try {
        const reponse = await http.patch(`/room/${id}`, room)
        thunkAPI.dispatch(updateRoomInCategoryRoom(reponse))
        return reponse
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const getRoomById = createAsyncThunk('room/getRoomById', async(id, {rejectWithValue})=>{
    try {
        const reponse = await http.get(`/room/${id}`)
        return reponse
    } catch (error) {
        return rejectWithValue(error)
    }
})

export const deleteRoom = createAsyncThunk('room/deleteRoom', async(id, {rejectWithValue})=>{
    try {
        const reponse = await http.delete(`/room?id=${id}`)
        return reponse
    } catch (error) {
        return rejectWithValue(error)
    }
})