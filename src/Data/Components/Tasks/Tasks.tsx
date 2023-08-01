import React, {useEffect} from 'react';
import {RootStateType, useAppDispatch} from "../../Redux/Store";
import {getTasksTC, TasksStateType} from "../../Redux/Reducers/TasksReducer";
import s from './Tasks.module.css'
import {useSelector} from "react-redux";
import {Task} from "../Task/Task";

type TasksPropsType = {
    todolistID: string
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
                   <div>
                       <Task
                           key={t.id}
                           title={t.title}
                           todolistId={props.todolistID}/>
                   </div>
                )
            })}
        </div>
    );
}