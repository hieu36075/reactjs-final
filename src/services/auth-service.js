import http from "./axios-interceptor";

export const loginService = (data) =>{
    console.log(data)
    return http.post('auth/login', data)
}

export const loginByGoogleService =(token)=>{
    return http.post('auth/login/google', token)
}