import { createAsyncThunk } from "@reduxjs/toolkit";
import http from "../../services/axios-interceptor";


export const getOrderById = createAsyncThunk('order/getOrderById', async(id, {rejectWithValue}) =>{
    try{
        const reponse = await http.get(`/order/${id}`);
        return reponse
    }catch(error){
        return rejectWithValue(error)
    }
})

export const getOrderByUserId = createAsyncThunk('order/getOrderByUserId', async(data, {rejectWithValue}) =>{
    try{
        const {page, perPage} = data
        const reponse = await http.get(`/order/getByUserId?page=${page}&perPage=${perPage}`);
        return reponse.data
    }catch(error){
        return rejectWithValue(error)
    }
})

export const getOrderInMonth = createAsyncThunk('order/getOrderInMonth', async(_, {rejectWithValue}) =>{
    try{
        const reponse = await http.get(`/order/order-in-month`);
        return reponse
    }catch(error){
        return rejectWithValue(error)
    }
})

export const getEarningInMonth = createAsyncThunk('order/getEarningInMonth', async(_, {rejectWithValue}) =>{
    try{
        const reponse = await http.get(`/order/earnings-in-months`);
        return reponse
    }catch(error){
        return rejectWithValue(error)
    }
})

export const getMonthlyRevenues = createAsyncThunk('order/getMonthlyRevenues', async(_, {rejectWithValue}) =>{
    try{
        const reponse = await http.get(`/order/monthly-revenues`);
        return reponse
    }catch(error){
        return rejectWithValue(error)
    }
})

export const getTotalRevenues = createAsyncThunk('order/getTotalRevenues', async(_, {rejectWithValue}) =>{
    try{
        const reponse = await http.get(`/order/total-revenues`);
        return reponse
    }catch(error){
        return rejectWithValue(error)
    }
})

export const getTotalRevenuesByHotelId = createAsyncThunk('order/getTotalRevenuesByHotelId', async(data, {rejectWithValue}) =>{
    try{
        const {hotelId, startYear} = data;
        const reponse = await http.get(`/order/monthly-revenues/${hotelId}?startYear=${startYear}`);
        return reponse
    }catch(error){
        return rejectWithValue(error)
    }
})

export const createOrder = createAsyncThunk('order/createOrder', async(order, {rejectWithValue})=>{
    try {
        const reponse = await http.post(`/order`, order)
        return reponse
    } catch (error) {
        return rejectWithValue(error)
    }
})

export const updateOrder = createAsyncThunk('order/updateOrder', async(order, {rejectWithValue})=>{
   const {id} = order
    try {
        const reponse = await http.patch(`/order?id=${id}`, order)
        return reponse
    } catch (error) {
        return rejectWithValue(error)
    }
})


export const confirmOrder = createAsyncThunk('order/confirmOrder', async(id, {rejectWithValue})=>{
    try {
        const reponse = await http.patch(`/order/confirm-order/${id}`)
        return reponse
    } catch (error) {
        return rejectWithValue(error)
    }
})
