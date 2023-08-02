import {TodoInitialStateType, TodoItemResponceType} from "../../API/APITypes";
import {todolistAPI} from "../../API/TodolistAPI";
import {AppThunkType} from "../Store";

export type TodoReducerActionType =
    | ReturnType<typeof getTodolistAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof deleteTodolistAC>
    | ReturnType<typeof changeTodolistTitleAC>


export const TodolistReducer = (state: TodoInitialStateType[] = [], action: TodoReducerActionType): TodoInitialStateType[] => {
    switch (action.type) {
        case 'GET-TODOLISTS' : {
            return action.payload.todolists.map(tl => {
                return {...tl, filter: 'all'}
            })
        }
        case "ADD-TODOLIST": {
            return [...state, {...action.payload.todolist, filter: 'all'}]
        }
        case "DELETE-TODOLIST": {
            return state.filter(el => el.id !== action.payload.todolistId)
        }
        case "CHANGE-TITLE": {
            return state.map(tl =>tl.id === action.payload.todolistId ? {...tl, title: action.payload.title} : tl)
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
        todolistAPI.getTodolists()
            .then(res => dispatch(getTodolistAC(res.data)))
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
        todolistAPI.postTodolists(title)
            .then(res => dispatch(addTodolistAC(res.data.item)))
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
        todolistAPI.deleteTodolists(todolistId)
            .then(res => dispatch(deleteTodolistAC(todolistId)))
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
        todolistAPI.putTodolists(todolistId, title)
            .then(res => dispatch(changeTodolistTitleAC(todolistId, title)))
    }
}