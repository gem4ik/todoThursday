import {AnyAction, applyMiddleware, combineReducers, legacy_createStore as createStore} from "redux";
import {TodolistReducer, TodoReducerActionType} from "./Reducers/TodolistReducer";
import {TasksReducer, TasksReducerActionType} from "./Reducers/TasksReducer";
import {useDispatch} from "react-redux";
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {AppReducer, AppReducerActionsType} from "./Reducers/AppReducer";
import {authReducer} from "./Reducers/AuthReducer";

export const RootState = combineReducers({
    Todolists: TodolistReducer,
    Tasks: TasksReducer,
    App: AppReducer,
    Auth: authReducer
})

export const store = createStore(RootState, applyMiddleware(thunk))

export type RootStateType = ReturnType<typeof RootState>

export type AppActionsTypes = TodoReducerActionType | TasksReducerActionType | AppReducerActionsType
export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType, RootStateType, unknown, AppActionsTypes>

type AppDispatchType = ThunkDispatch<RootStateType, unknown, AppActionsTypes>
// type AppDispatchType =ReturnType<typeof store>['dispatch']
export const useAppDispatch = useDispatch<AppDispatchType>