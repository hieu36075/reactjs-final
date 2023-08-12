import { createAsyncThunk } from "@reduxjs/toolkit";
import http from "../../services/axios-interceptor";

export const getCityByCountryId = createAsyncThunk('city/getCityByCountryId', async(data, {rejectWithValue}) =>{
    try{
        const { id, page, perPage } = data;
        const response = await http.get(`/city/getCityByCountry`, {
            params: {
              id: id,
              page,
              perPage,
            },
          });
        return response
    }catch(error){
        return rejectWithValue(error)
    }
})