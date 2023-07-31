import React from 'react';
import s from './Task.module.css'

type TaskPropsType = {
    title: string
    todolistId: string
}

export const Task = (props: TaskPropsType) => {
    return (
        <div className={s.taskWrapper}>

        </div>
    );
};