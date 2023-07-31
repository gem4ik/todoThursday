import {getUserAC} from "./TodolistReducer";

export type TasksReducerActionType = ReturnType<typeof getTasksAC>
| ReturnType<typeof getUserAC>

export const TasksReducer = (state = [], action: TasksReducerActionType) => {
    switch(action.type){
        case 'GET-TASKS' :{
            return state
        }
        case 'GET-TODOLISTS' : {
            return state
        }
        default:  return state
    }
}

export const getTasksAC = () => {
    return {
        type: 'GET-TASKS'
    }as const
}