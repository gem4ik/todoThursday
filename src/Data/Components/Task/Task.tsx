import React from 'react';
import s from './Task.module.css'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import Checkbox from "@mui/material/Checkbox";
import {EditableSpan} from "../EditableSpan/EditableSpan";

type TaskPropsType = {
    title: string
    todolistId: string
}

export const Task = (props: TaskPropsType) => {
    return (
        <div className={s.task__wrapper}>
            <Checkbox/>
            <EditableSpan value={props.title} onChange={()=>{}}/>
            <DeleteOutlinedIcon style={{cursor: "pointer"}} />
        </div>
    );
};