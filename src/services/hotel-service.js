import http from "./axios-interceptor";

export const getListHotelByCountryService = (countryId) =>{
    return http.get(`/hotel/get-hotel-by-country/${countryId}`)
}

export const getListHotelService = (page, perPage)=>{
    return http.get(`/hotel?page=${page}&perPage=${perPage}`)
}
