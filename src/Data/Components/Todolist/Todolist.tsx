import React from 'react';
import s from './Todolist.module.css'
import {Tasks} from "../Tasks/Tasks";
import {Button} from "@mui/material";

export type TodolistPropsType = {
    todolistId: string
    todolistTitle: string
}

export const Todolist = (props: TodolistPropsType) => {
    return (
        <div className={s.TodolistWrapper}>
            <div className={s.Todolist__title}>
                {props.todolistTitle}
            </div>
            <Tasks todolistID={props.todolistId}/>
            <div className={s.Todolist__filerButton}>
                <Button variant='contained'>All</Button>
                <Button>Active</Button>
                <Button>Completed</Button>
            </div>
        </div>
    );
};