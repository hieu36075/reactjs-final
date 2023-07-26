import { getListHotelByCategoryService, getListHotelByCountryService, getListHotelService } from "../../services/hotel-service";
import { getListHotelByCountryReducer, getListHotelReducer } from "../reducer/hotel-reducer";

export const getListHotelByCountryAction = (countryId) => {
    return async (dispatch)=>{
        try {
            const data =  await getListHotelByCountryService(countryId)
            dispatch(getListHotelByCountryReducer(data.data))
        } catch (error) {
            console.log(error)
        }
    }
}

// export const getListHotelByCategoryAction =(categoryId) =>{
//     return async(dispatch)=>{
//         try {
//             const data= await getListHotelByCategoryService(categoryId)
//             dispatch()
//         } catch (error) {
            
//         }
//     }
// }

export const getListHotelAction = (option) =>{
    return async(dispatch)=>{
        try {
            const data = await getListHotelService(option.page, option.perPage)
            dispatch(getListHotelReducer(data))
        } catch (error) {
            console.log(error)
        }
    }

}

