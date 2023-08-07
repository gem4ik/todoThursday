import {addTodolistAC, changeEntityStatusAC, deleteTodolistAC, getTodolistAC} from "./TodolistReducer";
import {AppThunkType, RootStateType} from "../Store";
import {todolistAPI} from "../../API/TodolistAPI";
import {TasksPutRequestModelType, TasksType, UpdateDomainTaskModelType} from "../../API/APITypes";
import {setStatusAC} from "./AppReducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/Utils";

export type TasksReducerActionType = ReturnType<typeof getTasksAC>
    | ReturnType<typeof getTodolistAC>
    | ReturnType<typeof deleteTodolistAC>
    | ReturnType<typeof createTaskAC>
    | ReturnType<typeof changeTaskAC>
    | ReturnType<typeof deleteTaskAC>
    | ReturnType<typeof addTodolistAC>

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
        case "ADD-TODOLIST": {
            return {...state, [action.payload.todolist.id]: []}
        }
        case "DELETE-TODOLIST": {
            const newTasks = {...state}
            delete newTasks[action.payload.todolistId]
            return newTasks
        }
        case "ADD-TASK": {
            return {...state, [action.payload.TodolistId]: [action.payload.task, ...state[action.payload.TodolistId]]}
        }
        case "CHANGE-TASK-TITLE": {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId]
                    .map(t => t.id === action.payload.taskId ? {...t, ...action.payload.model} : t)
            }
        }
        case "DELETE-TASK": {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter(t => t.id !== action.payload.taskId)
            }

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
        dispatch(setStatusAC('loading'))
        todolistAPI.getTasks(TodolistId)
            .then(res => {
                dispatch(getTasksAC(res.data.items, TodolistId))
                dispatch(setStatusAC('idle'))
            })
            .catch((e) => handleServerNetworkError(e, dispatch))
    }
}
export const createTaskAC = (TodolistId: string, task: TasksType) => {
    return {
        type: 'ADD-TASK',
        payload: {TodolistId, task}
    } as const
}
export const createTaskTC = (TodolistId: string, title: string): AppThunkType => {
    return (dispatch) => {
        dispatch(setStatusAC('loading'))
        todolistAPI.postTasks(TodolistId, title)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(createTaskAC(TodolistId, res.data.data.item))
                    dispatch(setStatusAC('idle'))
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            })
            .catch((e) => handleServerNetworkError(e, dispatch))
    }
}
export const changeTaskAC = (todolistId: string, taskId: string, model: UpdateDomainTaskModelType) => {
    return {
        type: 'CHANGE-TASK-TITLE',
        payload: {todolistId, taskId, model}
    } as const
}
export const changeTaskTC = (todolistId: string, taskId: string, domainModel: UpdateDomainTaskModelType): AppThunkType => {
    return (dispatch, getState: () => RootStateType) => {
        dispatch(setStatusAC('loading'))
        const state = getState()
        const task = state.Tasks[todolistId].find(task => task.id === taskId)
        if (!task) {
            return
        }
        const model: TasksPutRequestModelType = {
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            title: task.title,
            status: task.status,
            ...domainModel
        }
        todolistAPI.putTask(todolistId, taskId, model)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(changeTaskAC(todolistId, taskId, domainModel))
                    dispatch(setStatusAC('idle'))
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            })
            .catch((e) => handleServerNetworkError(e, dispatch))
    }
}
export const deleteTaskAC = (todolistId: string, taskId: string) => {
    return {
        type: 'DELETE-TASK',
        payload: {todolistId, taskId}
    } as const
}
export const deleteTaskTC = (todolistId: string, taskId: string): AppThunkType => {
    return (dispatch) => {
        dispatch(setStatusAC('loading'))
        dispatch(changeEntityStatusAC(todolistId, 'loading'))
        todolistAPI.deleteTask(todolistId, taskId)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(deleteTaskAC(todolistId, taskId))
                    dispatch(setStatusAC('idle'))
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            })
            .catch((e) => handleServerNetworkError(e, dispatch))
    }
}