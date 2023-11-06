import { createSlice } from "@reduxjs/toolkit";
import { switchRole } from "./roleThunk";


const initialState ={
    loading: false,
    error: {},
    data: [],
    details: [],
}

const roleSlice = createSlice({
    name: "roleSlice",
    initialState,
    reducers:{
    },
    extraReducers: builder =>{
        builder.addCase(switchRole.pending, (state, action) => {
            state.loading = false
        });
        builder.addCase(switchRole.fulfilled, (state, action) => {
            state.loading = true
            state.data = action.payload
            
            localStorage.setItem("token",action.payload.access_token)
            localStorage.setItem("rfToken",action.payload.refresh_token)
            state.error = ""
        });
        builder.addCase(switchRole.rejected, (state, action) => {
            state.isLogin = true;
            state.error = action.payload
        });

    }
});

export default roleSlice.reducer
