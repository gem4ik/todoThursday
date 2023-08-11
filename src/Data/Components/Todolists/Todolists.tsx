import React, {useEffect} from 'react';
import {RootStateType, useAppDispatch} from "../../Redux/Store";
import {useSelector} from "react-redux";
import {TodoInitialStateType, TodoItemResponceType} from "../../API/APITypes";
import {getTodolistTC} from "../../Redux/Reducers/TodolistReducer";
import Paper from "@mui/material/Paper";
import s from './Todolists.module.css'
import Grid from "@mui/material/Grid";
import {Todolist} from "../Todolist/Todolist";

export const Todolists = () => {
    const dispatch = useAppDispatch()
    const todolists = useSelector<RootStateType, TodoInitialStateType[]>(state => state.Todolists)
    const isLoggedIn = useSelector<RootStateType, boolean>( state => state.Auth.isLoggedIn)
    useEffect(() => {
        if(isLoggedIn) {
            dispatch(getTodolistTC())
        }
    }, [])
    return (
        <div >
           <Grid container className={s.app__wrapper} >

               {todolists.map((tl) => {
                   return <Grid item key={tl.id}
                                style={{padding:20}}>
                           <Paper
                               style={{minWidth: '200px',
                               borderRadius: '10px'}}
                               variant='outlined'>
                               <Todolist
                                   entityStatus={tl.entityStatus}
                                   todolistTitle={tl.title}
                                   key={tl.id}
                                   todolistId={tl.id}/>
                           </Paper>
                       </Grid>
               })}
           </Grid>
        </div>
    )
}