import { createAsyncThunk } from "@reduxjs/toolkit";
import http from "../../services/axios-interceptor";

export const getHotels = createAsyncThunk('hotel/getHotels', async(initialData, {rejectWithValue}) =>{
    try{
        const {page, perPage} = initialData;
        const reponse = await http.get(`/hotel?page=${page}&perPage=${perPage}`);
        return reponse.data
    }catch(error){
        return rejectWithValue(error)
    }
})

export const getHotelByCountry = createAsyncThunk('hotel/getHotelByCountry', async(countryId, {rejectWithValue})=>{
    try {
        const reponse = await http.get(`/hotel/get-hotel-by-country/${countryId}`)
        return reponse
    } catch (error) {
        return rejectWithValue(error)
    }
})

export const getHotelByCategory = createAsyncThunk('hotel/getHotelByCategory', async(categoryId, {rejectWithValue})=>{
    try {
        const reponse = await http.get(`/hotel/get-hotel-by-category/${categoryId}`)
        return reponse
    } catch (error) {
        return rejectWithValue(error)
    }
})


export const searchHotel = createAsyncThunk('hotel/searchHotel', async(data,{rejectWithValue})=>{
    const {countryId, name, categoryId} = data
    try {
        const reponse = await http.get(`/hotel/search?countryId=${countryId}&name=${name}&categoryId=${categoryId}`)
        console.log(reponse)
        return reponse
    } catch (error) {
        return rejectWithValue(error)
    }
})

export const getHotelById = createAsyncThunk('hotel/getHotelById', async(id, {rejectWithValue})=>{
    try {
        const reponse = await http.get(`hotel/${id}`)
        return reponse
    } catch (error) {
        return rejectWithValue(error)
    }
})

