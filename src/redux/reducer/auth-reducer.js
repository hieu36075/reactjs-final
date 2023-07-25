import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  token:[]
}

const authReducer = createSlice({
  name: "authReducer",
  initialState,
  reducers: {
    loginReducer:(state,action)=>{
        state.token = action.payload
    },
    loginByGoogleReducer:(state,action)=>{
        state.token = action.payload
    }
  }
});

export const {loginReducer,loginByGoogleReducer} = authReducer.actions

export default authReducer.reducer