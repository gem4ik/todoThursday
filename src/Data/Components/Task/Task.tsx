import React from 'react';
import s from './Task.module.css'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import Checkbox from "@mui/material/Checkbox";

type TaskPropsType = {
    title: string
    todolistId: string
}

export const Task = (props: TaskPropsType) => {
    return (
        <div className={s.task__wrapper}>
            <Checkbox/>
            <span className={s.task__title}>{props.title}</span>
            <DeleteOutlinedIcon />
        </div>
    );
};