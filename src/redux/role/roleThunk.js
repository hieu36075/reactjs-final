import { createAsyncThunk } from "@reduxjs/toolkit";
import http from "../../services/axios-interceptor";
import { setToken } from "../auth/authSlice";

export const switchRole = createAsyncThunk('role/switchRole', async(_, thunkAPi) =>{
    try{
        const reponse = await http.patch(`/auth/update-role`);
        thunkAPi.dispatch(setToken(reponse.access_token))
        return reponse
    }catch(error){
        return thunkAPi.rejectWithValue(error)
    }
})