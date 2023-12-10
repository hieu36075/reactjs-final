import { createSlice } from "@reduxjs/toolkit";


const initialState ={
    login: false,
    register: false,
    notification: {isOpen: false, message: ''}
}

const modalSlice = createSlice({
    name: "modal",
    initialState,
    reducers:{
        openLogin:(state, action)=>{
            state.login = true; 
        } ,
        closeLogin: (state, action)=>{
            state.login = false;
        },
        openRegister: (state, action)=>{
            state.register = true;
        },
        closeRegister: (state, action)=>{
            state.register = false
        },
        openMessage:(state,action)=>{
            state.notification.isOpen= true
            state.notification.message = action.payload
        }
    },
   
});

export const {openLogin, closeLogin,openRegister,closeRegister} = modalSlice.actions
export default modalSlice.reducer