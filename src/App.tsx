import React from 'react';
import s from './App.module.css';
import Container from "@mui/material/Container";
import {Todolists} from "./Data/Components/Todolists/Todolists";
import {ApplicationBar} from "./Data/Components/AppBar/ApplicationBar";
import {AddItemForm} from "./Data/Components/AddItemForm/AddItemForm";
import {useAppDispatch} from "./Data/Redux/Store";
import {addTodolistTC} from "./Data/Redux/Reducers/TodolistReducer";

function App() {
    const dispatch = useAppDispatch()
    const addItem = (title: string) =>  {
        dispatch(addTodolistTC(title))
    }

    return (
        <div className={s.App__wrapper}>
            <ApplicationBar/>
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