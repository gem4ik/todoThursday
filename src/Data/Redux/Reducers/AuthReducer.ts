import { Dispatch } from 'redux'
import {setErrorAC, setStatusAC} from "./AppReducer";
import {FormikErrorType} from "../../Components/Login/Login";
import {authAPI} from "../../API/TodolistAPI";
import {handleServerAppError, handleServerNetworkError} from "../../utils/Utils";


const initialState = {
    isLoggedIn: true,
    isInitialized: false
}

type InitialStateType = {
    isLoggedIn: boolean
    isInitialized: boolean
}

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
        case 'login/SET-IS-INITIALIZED':
            return {...state, isInitialized: action.value}
        default:
            return state
    }
}
// actions
export const setIsLoggedInAC = (value: boolean) =>
    ({type: 'login/SET-IS-LOGGED-IN', value} as const)
export const setIsInitializedAC = (value: boolean) =>
    ({type: 'login/SET-IS-INITIALIZED', value} as const)
// thunks
export const loginTC = (data: FormikErrorType) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setStatusAC('loading'))
    authAPI.login(data)
        .then((res)=>{
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(true))
                dispatch(setStatusAC('idle'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((e) => handleServerNetworkError(e, dispatch))
}
export const logoutTC = () => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setStatusAC('loading'))
    authAPI.logout()
        .then((res)=>{
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(false))
                dispatch(setStatusAC('idle'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((e) => handleServerNetworkError(e, dispatch))
}
export const isLoggedInTC = () => (dispatch: Dispatch<ActionsType>) => {
    authAPI.me()
        .then((res)=>{
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(true))
                dispatch(setIsInitializedAC(true))
            } else {
                dispatch(setIsLoggedInAC(false))
            }
        })
}


type ActionsType = ReturnType<typeof setIsLoggedInAC> | ReturnType<typeof setStatusAC>
    | ReturnType<typeof setErrorAC> |ReturnType<typeof setIsInitializedAC>