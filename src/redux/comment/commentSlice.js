import { createSlice } from "@reduxjs/toolkit";
import { addComment, getAllCommentByHotelId, getCommentByHotelId } from "./commentThunks";


const initialState ={
    loading: false,
    error: {},
    data: [],
    details: [],
    total:[],
    meta: []
}

const commentSlice = createSlice({
    name: "comment",
    initialState,
    reducers:{
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCommentByHotelId.pending, (state) => {
                state.loading = true
            })
            .addCase(getCommentByHotelId.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload.data
                state.error = ""
            })
            .addCase(getCommentByHotelId.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })

            .addCase(getAllCommentByHotelId.pending, (state) => {
                state.loading = true
            })
            .addCase(getAllCommentByHotelId.fulfilled, (state, action) => {
                state.loading = false
                state.total = action.payload
                state.error = ""
            })
            .addCase(getAllCommentByHotelId.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })

            .addCase(addComment.pending, (state) => {
                state.loading = true
            })
            .addCase(addComment.fulfilled, (state, action) => {
                state.loading = false
                state.data.unshift(action.payload) 
                if (state.data.length > 6) {
                    state.data.pop(); 
                  }
                state.error = ""
            })
            .addCase(addComment.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
    }
});

export default commentSlice.reducer