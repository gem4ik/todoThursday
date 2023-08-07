import React from 'react';
import s from './App.module.css';
import Container from "@mui/material/Container";
import {Todolists} from "./Data/Components/Todolists/Todolists";
import {ApplicationBar} from "./Data/Components/AppBar/ApplicationBar";
import {AddItemForm} from "./Data/Components/AddItemForm/AddItemForm";
import {RootStateType, useAppDispatch} from "./Data/Redux/Store";
import {addTodolistTC} from "./Data/Redux/Reducers/TodolistReducer";
import {LinearProgress} from "@mui/material";
import {Error} from "@mui/icons-material";
import {ErrorSnackbar} from "./Data/Components/Snackbar/ErrorSnackbar";
import {useSelector} from "react-redux";
import {RequestStatusType} from "./Data/Redux/Reducers/AppReducer";

function App() {
    const status = useSelector<RootStateType, RequestStatusType>(state => state.App.status)
    const dispatch = useAppDispatch()
    const addItem = (title: string) => {
        dispatch(addTodolistTC(title))
    }

    return (
        <div className={s.App__wrapper}>
            <ApplicationBar/>
            {status === 'loading' && <LinearProgress/>}
            <ErrorSnackbar/>
            <div className={s.App__AddItemForm}>
                <AddItemForm addItem={addItem}/>
            </div>
            <Container fixed>
                <Todolists/>
            </Container>
        </div>
    );
}

export default App;