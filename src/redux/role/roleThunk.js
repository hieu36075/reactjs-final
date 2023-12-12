import { createAsyncThunk } from "@reduxjs/toolkit";
import http from "../../services/axios-interceptor";
import { setToken } from "../auth/authSlice";
import { openMessage } from "../modal/modalSlice";
import jwtDecode from "jwt-decode";

export const switchRole = createAsyncThunk('role/switchRole', async(_, thunkAPi) =>{
    try{
        const reponse = await http.patch(`/auth/update-role`);
        thunkAPi.dispatch(setToken(reponse.access_token))
        const decode = jwtDecode(reponse.access_token)
        thunkAPi.dispatch(openMessage({message:`Change role success ${decode.roles}`, notificationType: 'success'}))
        return reponse
    }catch(error){
        return thunkAPi.rejectWithValue(error)
    }
})