import React from 'react';
import s from './Todolist.module.css'
import {Tasks} from "../Tasks/Tasks";
import Button from "@mui/material/Button";
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {useAppDispatch} from "../../Redux/Store";
import {changeTodolistTitleTC, deleteTodolistTC} from "../../Redux/Reducers/TodolistReducer";
import {createTaskTC} from "../../Redux/Reducers/TasksReducer";
import IconButton from "@mui/material/IconButton";
import Delete from "@mui/icons-material/Delete";
import {RequestStatusType} from "../../Redux/Reducers/AppReducer";

export type TodolistPropsType = {
    todolistId: string
    todolistTitle: string
    entityStatus: RequestStatusType
}

export const Todolist = (props: TodolistPropsType) => {
    const dispatch = useAppDispatch()
    const  DeleteTodoHandler = () => {
        dispatch(deleteTodolistTC(props.todolistId))
    }
    const changeTodoTitleHandler = (title: string) => {
        dispatch(changeTodolistTitleTC(props.todolistId, title))
    }
    const onChangeHandler = (newValue: string) => {
        dispatch(createTaskTC(props.todolistId, newValue))
    }
    return (
        <div className={s.TodolistWrapper}>
            <div className={s.Todolist__title}>
                <h2>
                    <EditableSpan
                        onChange={changeTodoTitleHandler}
                        value={props.todolistTitle}/>
                </h2>
                <IconButton
                    disabled={props.entityStatus === 'loading'}
                    onClick={DeleteTodoHandler}>
                    <Delete/>
                </IconButton>
            </div>
            <div className={s.Todolist__AddItemForm}>
                <AddItemForm addItem={onChangeHandler}/>
            </div>
            <Tasks
                entityStatus={props.entityStatus}
                todolistID={props.todolistId}/>
            <div className={s.Todolist__filerButton}>
                <Button variant='contained'>All</Button>
                <Button>Active</Button>
                <Button>Completed</Button>
            </div>
        </div>
    );
};