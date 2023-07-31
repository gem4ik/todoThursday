import {TodoItemResponceType} from "../../API/APITypes";
import {todolistAPI} from "../../API/TodolistAPI";
import {AppThunkType} from "../Store";

export type TodoReducerActionType = ReturnType<typeof getTodolistAC>


export const TodolistReducer = (state = [], action: TodoReducerActionType) => {
    switch(action.type){
        case 'GET-TODOLISTS' :{
            return action.payload.todolists
        }
        default:  return state
    }
}

export const getTodolistAC = (todolists: TodoItemResponceType[]) => {
    return {
        type: 'GET-TODOLISTS',
        payload: {todolists}
    }as const
}
export const getTodolistTC = (): AppThunkType => {
    return (dispatch) => {
        todolistAPI.getTodolists()
            .then(res=>dispatch(getTodolistAC(res.data)))
    }
}