import {applyMiddleware, combineReducers, createStore} from "redux";
import {TodolistReducer} from "./Reducers/TodolistReducer";
import {TasksReducer} from "./Reducers/TasksReducer";
import {useDispatch} from "react-redux";
import thunk from "redux-thunk";

export const RootState = combineReducers({
    Todolists: TodolistReducer,
    Tasks: TasksReducer
})

export const store = createStore(RootState, applyMiddleware(thunk))


export const useAppDispatch: any = useDispatch
