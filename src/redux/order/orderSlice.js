import { createSlice } from "@reduxjs/toolkit";
import { createOrder, getEarningInMonth, getMonthlyRevenues, getOrderById, getOrderByUserId, getOrderInMonth, getTotalRevenues } from "./orderThunk";
const initialState ={
    loading: false,
    error: {},
    data: [],
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
                state.loading = false
            })
            .addCase(createOrder.fulfilled, (state, action) => {
                state.loading = true
                state.data = action.payload
            })
            .addCase(createOrder.rejected, (state, action) => {
                state.loading = true
                state.error = action.payload
            })

            //
            .addCase(getOrderByUserId.pending, (state) => {
                state.loading = false
            })
            .addCase(getOrderByUserId.fulfilled, (state, action) => {
                state.loading = true
                state.data = action.payload
            })
            .addCase(getOrderByUserId.rejected, (state, action) => {
                state.loading = true
                state.error = action.payload
            })

                        //
            .addCase(getOrderById.pending, (state) => {
                state.loading = false
            })
            .addCase(getOrderById.fulfilled, (state, action) => {
                state.loading = true
                state.data = action.payload
            })
            .addCase(getOrderById.rejected, (state, action) => {
                state.loading = true
                state.error = action.payload
            })

            //
            .addCase(getOrderInMonth.pending, (state) => {
                state.loading = false
            })
            .addCase(getOrderInMonth.fulfilled, (state, action) => {
                state.loading = true
                state.orderInMonth = action.payload
            })
            .addCase(getOrderInMonth.rejected, (state, action) => {
                state.loading = true
                state.error = action.payload
            })

            //
            .addCase(getEarningInMonth.pending, (state) => {
                state.loading = false
            })
            .addCase(getEarningInMonth.fulfilled, (state, action) => {
                state.loading = true
                state.earningInMonth = action.payload
            })
            .addCase(getEarningInMonth.rejected, (state, action) => {
                state.loading = true
                state.error = action.payload
            })

              //
            .addCase(getMonthlyRevenues.pending, (state) => {
                state.loading = false
            })
            .addCase(getMonthlyRevenues.fulfilled, (state, action) => {
                state.loading = true
                state.monthRevenuse = action.payload
            })
            .addCase(getMonthlyRevenues.rejected, (state, action) => {
                state.loading = true
                state.error = action.payload
            })

             //
            .addCase(getTotalRevenues.pending, (state) => {
                state.loading = false
            })
            .addCase(getTotalRevenues.fulfilled, (state, action) => {
                state.loading = true
                state.totalRevenuse = action.payload
            })
            .addCase(getTotalRevenues.rejected, (state, action) => {
                state.loading = true
                state.error = action.payload
            })
    }
});

export default orderSlice.reducer