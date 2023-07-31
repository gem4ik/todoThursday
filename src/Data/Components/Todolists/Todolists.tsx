import React, {useEffect} from 'react';
import s from './Todolists.module.css'
import {RootStateType, useAppDispatch} from "../../Redux/Store";
import {useSelector} from "react-redux";
import {TodoItemResponceType} from "../../API/APITypes";
import {getTodolistTC} from "../../Redux/Reducers/TodolistReducer";
import {Todolist} from "../Todolist/Todolist";

export const Todolists = () => {
    const dispatch = useAppDispatch()
    const todolists = useSelector<RootStateType, TodoItemResponceType[]>(state => state.Todolists)

    useEffect(()=>{
        dispatch(getTodolistTC())
    }, [])
    return (
        <div className={s.TodolistsWrapper}>
            {todolists.map((tl)=>{
                return <Todolist todolistId={tl.id}/>
            })}
        </div>
    )
}