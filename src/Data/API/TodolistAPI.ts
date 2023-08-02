import axios, {AxiosResponse} from "axios";
import {
    TasksRequestType,
    TasksType,
    TasksUpdateResponseType,
    TodoItemResponceType,
    TodoResponceType,
    UpdateDomainTaskModelType
} from "./APITypes";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '31d3b244-d207-4062-b145-297089d8f2c1'
    }
})


export const todolistAPI = {
    getTodolists() {
        return instance.get<TodoItemResponceType[]>('todo-lists')
    },
    postTodolists(title: string) { //<100
        return instance.post<null, AxiosResponse<TodoResponceType<{ item: TodoItemResponceType }>>,
            { title: string }>('todo-lists', {title})
    },
    deleteTodolists(todolistID: string) {
        return instance.delete<TodoResponceType>(`todo-lists/${todolistID}`)
    },
    putTodolists(todolistID: string, title: string) {
        return instance.put<null, TodoResponceType, { title: string }>(`todo-lists/${todolistID}`, {title})
    },
    putReorderTodo(todolistID: string, putAfterItemId: string) {
        return instance.put<null, TodoResponceType, { putAfterItemId: string }>(`todo-lists/${todolistID}/tasks`, {putAfterItemId})
    },
    getTasks(todolistID: string) {
        return instance.get<TasksRequestType>(`todo-lists/${todolistID}/tasks`)
    },
    postTasks(todolistID: string, title: string) {
        return instance.post<null,AxiosResponse<TodoResponceType<{item: TasksType}>>, { title: string }>(`todo-lists/${todolistID}/tasks`, {title})
    },
    putTask(todolistID: string, taskID:string, domainModel: UpdateDomainTaskModelType) {
        //null, TasksUpdateResponseType, TasksPutRequestModelType убрать null или добавить axios responce
        return instance.put<null, AxiosResponse<TasksUpdateResponseType>, UpdateDomainTaskModelType>(`todo-lists/${todolistID}/tasks/${taskID}`, domainModel)
    },
    deleteTask(todolistID: string, taskID: string) {
        return instance.delete<TodoResponceType>(`todo-lists/${todolistID}/tasks/${taskID}`)
    },
    reorderTasks(todolistID: string, taskID: string, putAfterItemId: string) {
        return instance.put<null, TodoResponceType, { putAfterItemId: string }>(`todo-lists/${todolistID}/tasks/${taskID}/reorder`, {putAfterItemId})
    }
}