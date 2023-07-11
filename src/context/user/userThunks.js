import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../api";
export const getUsers = createAsyncThunk('user/getUsers', async(initialData, {rejectWithValue}) =>{
    try{
        const reponse = await instance.get(`/user`);
        return reponse.data
    }catch(error){
        return rejectWithValue(error)
    }
})