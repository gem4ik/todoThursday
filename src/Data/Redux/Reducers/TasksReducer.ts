import {deleteTodolistAC, getTodolistAC} from "./TodolistReducer";
import {AppThunkType} from "../Store";
import {todolistAPI} from "../../API/TodolistAPI";
import {TasksType} from "../../API/APITypes";

export type TasksReducerActionType = ReturnType<typeof getTasksAC>
    | ReturnType<typeof getTodolistAC>
    | ReturnType<typeof deleteTodolistAC>

export type TasksStateType = {
    [key: string]: TasksType[]
}

export const TasksReducer = (state: TasksStateType = {}, action: TasksReducerActionType) => {
    switch (action.type) {
        case 'GET-TASKS' : {
            return {...state, [action.payload.TodolistId]: [...action.payload.tasks]}
        }
        case 'GET-TODOLISTS' : {
            const stateCopy = {...state}
            action.payload.todolists.forEach((tl) => {
                stateCopy[tl.id] = []
            })
            return stateCopy
        }
        case "DELETE-TODOLIST": {
            const newTasks = {...state}
            delete newTasks[action.payload.todolistId]
            return newTasks
        }
        default:
            return state
    }
}

export const getTasksAC = (tasks: TasksType[], TodolistId: string) => {
    return {
        type: 'GET-TASKS',
        payload: {tasks, TodolistId}
    } as const
}
export const getTasksTC = (TodolistId: string): AppThunkType => {
    return (dispatch) => {
        todolistAPI.getTasks(TodolistId)
            .then(res => dispatch(getTasksAC(res.data.items, TodolistId)))
    }
}