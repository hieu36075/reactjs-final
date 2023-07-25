import http from "./axios-interceptor";

export const getListTopHotelInCountryService= ()=>{
    return http.get(`country/topCountry`)
}
