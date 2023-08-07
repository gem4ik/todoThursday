import {TodoInitialStateType, TodoItemResponceType} from "../../API/APITypes";
import {todolistAPI} from "../../API/TodolistAPI";
import {AppThunkType} from "../Store";
import {RequestStatusType, setErrorAC, setStatusAC} from "./AppReducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/Utils";

export type TodoReducerActionType =
    | ReturnType<typeof getTodolistAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof deleteTodolistAC>
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeEntityStatusAC>


export const TodolistReducer = (state: TodoInitialStateType[] = [], action: TodoReducerActionType): TodoInitialStateType[] => {
    switch (action.type) {
        case 'GET-TODOLISTS' : {
            return action.payload.todolists.map(tl => {
                return {...tl, filter: 'all', entityStatus: 'idle'}
            })
        }
        case "ADD-TODOLIST": {
            return [{...action.payload.todolist, filter: 'all', entityStatus: 'idle'}, ...state]
        }
        case "DELETE-TODOLIST": {
            return state.filter(el => el.id !== action.payload.todolistId)
        }
        case "CHANGE-TITLE": {
            return state.map(tl => tl.id === action.payload.todolistId ? {...tl, title: action.payload.title} : tl)
        }
        case "CHANGE-ENTITY-STATUS": {
            return state.map(tl => tl.id === action.payload.todolistId ? {...tl, status: action.payload.status} : tl)
        }
        default:
            return state
    }
}

export const getTodolistAC = (todolists: TodoItemResponceType[]) => {
    return {
        type: 'GET-TODOLISTS',
        payload: {todolists}
    } as const
}
export const getTodolistTC = (): AppThunkType => {

    return (dispatch) => {
        dispatch(setStatusAC('loading'))
        todolistAPI.getTodolists()
            .then(res => {
                dispatch(getTodolistAC(res.data))
                dispatch(setStatusAC('idle'))
            })
            .catch((e) => handleServerNetworkError(e, dispatch))
    }
}
export const addTodolistAC = (todolist: TodoItemResponceType) => {

    return {
        type: 'ADD-TODOLIST',
        payload: {todolist}
    } as const
}
export const addTodolistTC = (title: string): AppThunkType => {
    return (dispatch) => {
        dispatch(setStatusAC('loading'))
        todolistAPI.postTodolists(title)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(addTodolistAC(res.data.data.item))
                    dispatch(setStatusAC('idle'))
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            })
            .catch((e) => handleServerNetworkError(e, dispatch))
    }
}
export const deleteTodolistAC = (todolistId: string) => {
    return {
        type: 'DELETE-TODOLIST',
        payload: {todolistId}
    } as const
}
export const deleteTodolistTC = (todolistId: string): AppThunkType => {
    return (dispatch) => {
        dispatch(setStatusAC('loading'))
        dispatch(changeEntityStatusAC(todolistId, 'loading'))
        todolistAPI.deleteTodolists(todolistId)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(deleteTodolistAC(todolistId))
                    dispatch(setStatusAC('idle'))
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            })
            .catch((e) => handleServerNetworkError(e, dispatch))
    }
}
export const changeTodolistTitleAC = (todolistId: string, title: string) => {
    return {
        type: 'CHANGE-TITLE',
        payload: {todolistId, title}
    } as const
}
export const changeTodolistTitleTC = (todolistId: string, title: string): AppThunkType => {
    return (dispatch) => {
        dispatch(setStatusAC('loading'))
        todolistAPI.putTodolists(todolistId, title)
            .then(res => {
                if (res.resultCode === 0) {
                    dispatch(deleteTodolistAC(todolistId))
                } else {
                    handleServerAppError(res, dispatch)
                }
            })
            .catch((e) => handleServerNetworkError(e, dispatch))
    }
}
export const changeEntityStatusAC = (todolistId: string, status: RequestStatusType) => {
    return {
        type: 'CHANGE-ENTITY-STATUS',
        payload: {todolistId, status}
    } as const
}