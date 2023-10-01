import { createAsyncThunk } from "@reduxjs/toolkit";
import http from "../../services/axios-interceptor";

export const getCategory = createAsyncThunk('category/getCategory', async(data, {rejectWithValue}) =>{
    try{
      const {page, perPage} = data;
        const reponse = await http.get(`/categories?page=${page}&perPage=${perPage}`);
  
        return reponse
    }catch(error){
        return rejectWithValue(error)
    }
})

export const addCategory = createAsyncThunk('category/addCategory', async (initialData, {rejectWithValue}) => {
    try{
    const response = await http
      .post(`/categories`, initialData);
    return response;
    }
    catch(error){
      if (error.response && error.response.status === 401) {

          return rejectWithValue("End of Login Session")
      }if (error.response && error.response.status === 403){
  
        return rejectWithValue("Your accounts don't can't access")
      } else {
   
          return rejectWithValue(error.response.data)
      }
  }
  })