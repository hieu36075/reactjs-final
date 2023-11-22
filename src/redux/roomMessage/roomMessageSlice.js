
import { createSlice } from "@reduxjs/toolkit";
import { checkRoomMessage, getMyMessage, getRoomMessage, getMessageByRoomId } from "./roomMessageThunk";

const initialState ={
    loading: false,
    error: {},
    data: [],
    details: [],
}

const roomSlice = createSlice({
    name: "roomMessage",
    initialState,
    reducers:{
        addMessage: (state,action)=>{
            const {roomId, newMessage} = action.payload
            const currentRoomIndex  = state.data.findIndex((item)=> item.id === roomId) 
            if(currentRoomIndex  !== -1){
                const currentRoom = state.data[currentRoomIndex];
                state.data.splice(currentRoomIndex, 1);
                state.data.unshift(currentRoom);
            }
            if(roomId === state.details.id){
                state.details.message.push(newMessage)    
            }
        },
        updateListUser: (state, action)=>{
      
        },
        updateNewRoom: (state, action)=>{
            state.data.push(action.payload)
        },
        
    },
    extraReducers: (builder) => {
        builder
            .addCase(getRoomMessage.pending, (state) => {
                state.loading = true
            })
            .addCase(getRoomMessage.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload
                state.error = ""
            })
            .addCase(getRoomMessage.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })

            .addCase(checkRoomMessage.pending, (state) => {
                state.loading = true
            })
            .addCase(checkRoomMessage.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload
                state.error = ""
            })
            .addCase(checkRoomMessage.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            .addCase(getMyMessage.pending, (state) => {
                state.loading = true
            })
            .addCase(getMyMessage.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload
                state.error = ""
            })
            .addCase(getMyMessage.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            .addCase(getMessageByRoomId.pending, (state) => {
                state.loading = true
            })
            .addCase(getMessageByRoomId.fulfilled, (state, action) => {
                state.loading = false
                state.details = action.payload
                state.error = ""
            })
            .addCase(getMessageByRoomId.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
    }
});
export const {addMessage, updateListUser,updateNewRoom} = roomSlice.actions
export default roomSlice.reducer