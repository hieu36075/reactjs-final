import { loginByGoogleService, loginService } from "../../services/auth-service"
import { loginByGoogleReducer, loginReducer } from "../reducer/auth-reducer"

export const loginAction=(account)=>{
    return async (dispatch)=>{
        try {
            const data = await loginService(account)
            localStorage.setItem('token', data.accessToken)
            await dispatch(loginReducer(data))
        } catch (error) {
            console.log(error)
        }
    }
}

export const loginByGoogleAction=(token)=>{
    return async(dispatch)=>{
        try {
            const data = await loginByGoogleService(token)
            localStorage.setItem("AuthData", data.accessToken);
            dispatch(loginByGoogleReducer(data))
        } catch (error) {
            console.log(error)
        }
    }
}