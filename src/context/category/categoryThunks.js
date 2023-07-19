import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../api";

export const getCategory = createAsyncThunk('category/getCategory', async(_, {rejectWithValue}) =>{
    try{
        const reponse = await instance.get(`/categories`);
        return reponse.data
    }catch(error){
        return rejectWithValue(error)
    }
})

export const addCategory = createAsyncThunk('category/addCategory', async (initialData, {rejectWithValue}) => {
    console.log("datathunk",initialData)
    try{
    const response = await instance
      .post(`/categories`, initialData);
    return response.data;
    }
    catch(error){
      if (error.response && error.response.status === 401) {
        console.log("a", error)
          return rejectWithValue("End of Login Session")
      }if (error.response && error.response.status === 403){
        console.log("a", error)
        return rejectWithValue("Your accounts don't can't access")
      } else {
        console.log("b", error)
          return rejectWithValue(error.response.data)
      }
  }
  })