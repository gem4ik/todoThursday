import {RequestStatusType} from "../Redux/Reducers/AppReducer";

export type TodoResponceType<D={}> = {
    data: D
    resultCode: number
    messages: string[]
    fieldsErrors?: string[]
}
export type FilterValueType = 'all' | 'active' | 'complete'
export type TodoInitialStateType = TodoItemResponceType & {filter: FilterValueType, entityStatus: RequestStatusType}
export type TodoItemResponceType = {
    id: string
    title: string
    addedDate: string
    order: number
}
export type TasksPutRequestModelType= {
    title: string
    description: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
}
export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}
export type TasksUpdateResponseType = {
    data: {
        item: TasksType
    },
    messages: string[],
    fieldsErrors: string[],
    resultCode: number
}
export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}
export type TasksRequestType = {
    items: TasksType[]
    totalCount: number
    error: null | string
}
export type TasksType = {
    id: string
    title: string
    description: string
    todoListId: string
    order: number
    status: number
    priority: number
    startDate: string
    deadline: string
    addedDate: string
    completed?: boolean
}