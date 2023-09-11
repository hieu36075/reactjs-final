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

export const getHotelByRoom = createAsyncThunk('hotel/getHotelByRoom', async(data, {rejectWithValue})=>{
    const {hotelId, roomId} = data
    try {
        const reponse = await http.get(`/hotel/get-hotel-by-room/?hotelId=${hotelId}&roomId=${roomId}`)
        return reponse
    } catch (error) {
        return rejectWithValue(error)
    }
})


export const getHotelByUserId = createAsyncThunk('hotel/getHotelByUserId', async(data, {rejectWithValue})=>{
   const {page, perPage}= data
    try {
        const reponse = await http.get(`/hotel/get-by-user/?page=${page}&perPage=${perPage}`)
        console.log(reponse)
        return reponse.data
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
    console.log(data)
    const {countryId, name, categoryId, occupancy, minPrice, maxPrice} = data
    try {
        const reponse = await http.get(`/hotel/search?countryId=${countryId}&name=${name}&categoryId=${categoryId}&occupancy=${occupancy}&minPrice=${minPrice}&maxPrice=${maxPrice}`)
        console.log(reponse)
         return reponse
    } catch (error) {
        return rejectWithValue(error)
    }
})

export const getHotelById = createAsyncThunk('hotel/getHotelById', async(id, {rejectWithValue})=>{
    try {
        const reponse = await http.get(`/hotel/${id}`)
        return reponse
    } catch (error) {
        return rejectWithValue(error)
    }
})

export const createHotel = createAsyncThunk('hotel/createHotel', async(hotel, {rejectWithValue})=>{
    try {
        console.log("a",hotel)
        const reponse = await http.post(`/hotel`, hotel)
        console.log(reponse)
        return reponse
    } catch (error) {
        return rejectWithValue(error)
    }
})

export const uploadMultiImangeHotel = createAsyncThunk('hotel/uploadMultiImangeHotel', async(file, {rejectWithValue})=>{
    try {
        const reponse = await http.post(`/hotel/multiple-file-upload`, file)
        return reponse
    } catch (error) {
        return rejectWithValue(error)
    }
})
