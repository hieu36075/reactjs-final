import { createSlice } from "@reduxjs/toolkit";
import { confirmOrder, createOrder, getEarningInMonth, getMonthlyRevenues, getOrderById, getOrderByUserId, getOrderInMonth, getTotalRevenues, updateOrder } from "./orderThunk";
const initialState ={
    loading: false,
    error: {},
    data: [],
    details:[],
    orderInMonth:[],
    earningInMonth: [],
    monthRevenuse: [],
    totalRevenuse: [],
}

const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers:{
    },
    extraReducers: (builder) => {
        builder
            .addCase(createOrder.pending, (state) => {
                state.loading = true
            })
            .addCase(createOrder.fulfilled, (state, action) => {
                state.loading = false
                state.details = action.payload
            })
            .addCase(createOrder.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })

            .addCase(updateOrder.pending, (state, action) => {
                state.loading = true
                state.data = action.payload
            })
            .addCase(updateOrder.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload
            })
            .addCase(updateOrder.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })

            //
            .addCase(getOrderByUserId.pending, (state) => {
                state.loading = true
            })
            .addCase(getOrderByUserId.fulfilled, (state, action) => {
                state.data = action.payload
                state.loading = false
            })
            .addCase(getOrderByUserId.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })

             //
            .addCase(getOrderById.pending, (state) => {
                state.loading = true
            })
            .addCase(getOrderById.fulfilled, (state, action) => {
                state.loading = false
                state.details = action.payload
            })
            .addCase(getOrderById.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            //
            .addCase(confirmOrder.pending, (state) => {
                state.loading = true
            })
            .addCase(confirmOrder.fulfilled, (state, action) => {
                state.loading = false
                state.totalRevenuse = action.payload
            })
            .addCase(confirmOrder.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            //
            .addCase(getOrderInMonth.pending, (state) => {
                state.loading = true
            })
            .addCase(getOrderInMonth.fulfilled, (state, action) => {
                state.loading = false
                state.orderInMonth = action.payload
            })
            .addCase(getOrderInMonth.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })

            //
            .addCase(getEarningInMonth.pending, (state) => {
                state.loading = true
            })
            .addCase(getEarningInMonth.fulfilled, (state, action) => {
                state.loading = false
                state.earningInMonth = action.payload
            })
            .addCase(getEarningInMonth.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })

              //
            .addCase(getMonthlyRevenues.pending, (state) => {
                state.loading = true
            })
            .addCase(getMonthlyRevenues.fulfilled, (state, action) => {
                state.loading = false
                state.monthRevenuse = action.payload
            })
            .addCase(getMonthlyRevenues.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })

             //
            .addCase(getTotalRevenues.pending, (state) => {
                state.loading = true
            })
            .addCase(getTotalRevenues.fulfilled, (state, action) => {
                state.loading = false
                state.totalRevenuse = action.payload
            })
            .addCase(getTotalRevenues.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
    }
});

export default orderSlice.reducer