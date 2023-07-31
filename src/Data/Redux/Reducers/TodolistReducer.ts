import {TodoItemResponceType} from "../../API/APITypes";
import {Dispatch} from "redux";
import {todolistAPI} from "../../API/TodolistAPI";
import {AppThunkType} from "../Store";

export type TodoReducerActionType = ReturnType<typeof getUserAC>


export const TodolistReducer = (state = [], action: TodoReducerActionType) => {
    switch(action.type){
        case 'GET-TODOLISTS' :{
            return {...action.payload.users}
        }
        default:  return state
    }
}

export const getUserAC = (users: TodoItemResponceType[]) => {
    return {
        type: 'GET-TODOLISTS',
        payload: {users}
    }as const
}
export const getUserTC = (): AppThunkType => {
    return (dispatch) => {
        todolistAPI.getTodolists()
            .then(res=>dispatch(getUserAC(res.data)))
    }
}