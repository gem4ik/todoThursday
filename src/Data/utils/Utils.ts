import {Dispatch} from 'redux'
import {setErrorAC, setStatusAC} from "../Redux/Reducers/AppReducer";
import {TodoResponceType} from "../API/APITypes";

// generic function
export const handleServerAppError = <T>(data: TodoResponceType<T>, dispatch: ErrorUtilsDispatchType) => {
    if (data.messages.length) {
        dispatch(setErrorAC(data.messages[0]))
    } else {
        dispatch(setErrorAC('Some error occurred'))
    }
    dispatch(setStatusAC('failed'))
}

export const handleServerNetworkError = (error: { message: string }, dispatch: ErrorUtilsDispatchType) => {
    dispatch(setErrorAC(error.message))
    dispatch(setStatusAC('failed'))
}

type ErrorUtilsDispatchType = Dispatch<ReturnType<typeof setErrorAC> | ReturnType<typeof setStatusAC>>
