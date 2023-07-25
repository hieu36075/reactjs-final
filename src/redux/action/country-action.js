import { getListTopHotelInCountryService } from "../../services/country-service"
import { getListTopCountryInHotelReducer } from "../reducer/country-reducer"

export const getListTopCountryInHotelAction=() =>{
    return async(dispatch)=>{
        try {
            const data= await getListTopHotelInCountryService()
            dispatch(getListTopCountryInHotelReducer(data))
        } catch (error) {
            console.log(error)
        }
    }
}