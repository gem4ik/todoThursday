import React, {useEffect} from 'react';
import {RootStateType, useAppDispatch} from "../../Redux/Store";
import {useSelector} from "react-redux";
import {TodoItemResponceType} from "../../API/APITypes";
import {getTodolistTC} from "../../Redux/Reducers/TodolistReducer";
import Paper from "@mui/material/Paper";

import Grid from "@mui/material/Grid";
import {Todolist} from "../Todolist/Todolist";

export const Todolists = () => {
    const dispatch = useAppDispatch()
    const todolists = useSelector<RootStateType, TodoItemResponceType[]>(state => state.Todolists)

    useEffect(() => {
        dispatch(getTodolistTC())
    }, [])
    return (
        <div>
           <Grid container >
               {todolists.map((tl) => {
                   return <div>
                       <Grid item >
                           <Paper
                               style={{padding: '10px'}}
                               variant='outlined'
                               elevation={9}>
                               {tl.title}
                               <Todolist
                                   key={tl.id}
                                   todolistId={tl.id}/>
                           </Paper>
                       </Grid>
                   </div>
               })}
           </Grid>
        </div>
    )
}