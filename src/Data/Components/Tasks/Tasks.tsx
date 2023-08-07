import React, {useEffect} from 'react';
import {RootStateType, useAppDispatch} from "../../Redux/Store";
import {getTasksTC, TasksStateType} from "../../Redux/Reducers/TasksReducer";
import s from './Tasks.module.css'
import {useSelector} from "react-redux";
import {Task} from "../Task/Task";
import {RequestStatusType} from "../../Redux/Reducers/AppReducer";

type TasksPropsType = {
    todolistID: string
    entityStatus: RequestStatusType
}
export const Tasks = (props: TasksPropsType) => {
    const dispatch = useAppDispatch()
    const tasks = useSelector<RootStateType, TasksStateType>(state => state.Tasks)
    useEffect(() => {
        dispatch(getTasksTC(props.todolistID))
    }, [])
    return (
        <div className={s.TasksWrapper}>
            {tasks[props.todolistID].map(t => {
                return (
                    <Task
                        entityStatus={props.entityStatus}
                        key={t.id}
                        title={t.title}
                        taskId={t.id}
                        checked={t.status}
                        todolistId={props.todolistID}/>
                )
            })}
        </div>
    );
}