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

export const createOrder = createAsyncThunk('order/createOrder', async(order, {rejectWithValue})=>{
    try {
        console.log("a",order)
        const reponse = await http.post(`/order`, order)
        console.log(reponse)
        return reponse
    } catch (error) {
        return rejectWithValue(error)
    }
})


