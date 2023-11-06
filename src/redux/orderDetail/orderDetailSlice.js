import { createSlice } from "@reduxjs/toolkit";
import { checkDateByRoom } from "./orderDetailThunk";

const initialState ={
    loading: false,
    error: {},
    data: [],
}

const orderDetailSlice = createSlice({
    name: "orderDetail",
    initialState,
    reducers:{
    },
    extraReducers: (builder) => {
        builder
            .addCase(checkDateByRoom.pending, (state) => {
                state.loading = true
            })
            .addCase(checkDateByRoom.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload
            })
            .addCase(checkDateByRoom.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })

    }
});

export default orderDetailSlice.reducer