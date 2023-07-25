import { createSlice } from "@reduxjs/toolkit";
import { getCategory } from "./categoryThunks";
import { addCategory } from "./categoryThunks";
const initialState ={
    loading: 'loading',
    error: {},
    data: [],
    page:[]
}

const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers:{
    },
    extraReducers: builder =>{
        builder.addCase(getCategory.pending, (state, action) => {
            state.loading = "pending"
        });
        builder.addCase(getCategory.fulfilled, (state, action) => {
            state.loading = "success"
            state.data = action.payload
            state.error = ""
        });
        builder.addCase(getCategory.rejected, (state, action) => {
            console.log(action.payload)
            state.error = action.payload
        });
        //
        builder.addCase(addCategory.pending, (state, action) => {
            state.loading = "pending"
        });
        builder.addCase(addCategory.fulfilled, (state, action) => {
            state.loading = "success"
            state.data.push(action.payload)
            state.error = ""
        });
        builder.addCase(addCategory.rejected, (state, action) => {
            console.log(action.payload)
            state.error = action.payload
        });
    }
});

export default categorySlice.reducer
