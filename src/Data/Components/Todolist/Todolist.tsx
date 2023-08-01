import React from 'react';
import s from './Todolist.module.css'
import {Tasks} from "../Tasks/Tasks";

export type TodolistPropsType = {
    todolistId: string
}

export const Todolist = (props: TodolistPropsType) => {
    return (
        <div className={s.TodolistWrapper}>
                <Tasks  todolistID={props.todolistId}/>
        </div>
    );
};