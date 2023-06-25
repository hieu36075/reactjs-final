import axios from "axios";

export const BaseApi =()=>{
    return axios.create({
        baseURL: "https://localhost:3500",
        headers:{Authorization: ''}
    })
}