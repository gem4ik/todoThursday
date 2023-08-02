import React from 'react';
import s from './Todolist.module.css'
import {Tasks} from "../Tasks/Tasks";
import {Button} from "@mui/material";
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import {useAppDispatch} from "../../Redux/Store";
import {changeTodolistTitleTC, deleteTodolistTC} from "../../Redux/Reducers/TodolistReducer";

export type TodolistPropsType = {
    todolistId: string
    todolistTitle: string
}

export const Todolist = (props: TodolistPropsType) => {
    const dispatch = useAppDispatch()
    const  DeleteTodoHandler = () => {
        dispatch(deleteTodolistTC(props.todolistId))
    }
    const changeTodoTitleHandler = (title: string) => {
        dispatch(changeTodolistTitleTC(props.todolistId, title))
    }
    return (
        <div className={s.TodolistWrapper}>
            <div className={s.Todolist__title}>
                <h2>
                    <EditableSpan
                        onChange={changeTodoTitleHandler}
                        value={props.todolistTitle}/>
                </h2>
                <DeleteOutlinedIcon
                    style={{cursor: "pointer"}}
                    onClick={DeleteTodoHandler}
                    className={s.Todolist__deleteIcon}/>
            </div>
            <div className={s.Todolist__AddItemForm}>
                <AddItemForm addItem={()=>{}}/>
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