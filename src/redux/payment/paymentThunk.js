import { createAsyncThunk } from "@reduxjs/toolkit"
import http from "../../services/axios-interceptor"

export const createBill = createAsyncThunk('payment/createBill', async(data, {rejectWithValue})=>{
    try {
        console.log("a",data)
        const reponse = await http.post(`/payment/create-payment-intent`, data)
        console.log(reponse)
        return reponse
    } catch (error) {
        return rejectWithValue(error)
    }
})

export const updateAmountPayment = createAsyncThunk('payment/updateAmountPayment', async(data, {rejectWithValue})=>{
    const {id, amount} = data
    try {
        const reponse = await http.patch(`/payment/${id}`,amount)
        console.log(reponse)
        return reponse
    } catch (error) {
        return rejectWithValue(error)
    }
})