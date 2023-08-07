import React, {ChangeEvent} from 'react';
import s from './Task.module.css'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import Checkbox from "@mui/material/Checkbox";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {useAppDispatch} from "../../Redux/Store";
import {changeTaskTC, deleteTaskTC} from "../../Redux/Reducers/TasksReducer";
import {TaskStatuses} from "../../API/APITypes";
import {RequestStatusType} from "../../Redux/Reducers/AppReducer";

type TaskPropsType = {
    title: string
    todolistId: string
    taskId: string
    checked: number
    entityStatus: RequestStatusType
}

export const Task = (props: TaskPropsType) => {
    const dispatch = useAppDispatch()
    const onTitleChangeHandler = (newTitle: string) => {
        dispatch(changeTaskTC(props.todolistId, props.taskId, {title: newTitle}))
    }
    const onStatusChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const newIsDoneValue = e.currentTarget.checked
        const status = newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New
        dispatch(changeTaskTC(props.todolistId,
            props.taskId, {status}))
    }
    const deleteTaskHandler = () => {
        dispatch(deleteTaskTC(props.todolistId, props.taskId))
    }
    const checkedStatus = props.checked === 2
    return (
        <div className={s.task__wrapper}>
            <Checkbox checked={checkedStatus} onChange={onStatusChangeHandler}/>
            <EditableSpan
                disabled={props.entityStatus === 'loading'}
                value={props.title}
                onChange={onTitleChangeHandler}/>
            <DeleteOutlinedIcon
                onClick={deleteTaskHandler}
                style={{cursor: "pointer"}}/>
        </div>
    );
};
