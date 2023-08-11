import React, {useEffect} from 'react';
import s from './App.module.css';
import Container from "@mui/material/Container";
import {Todolists} from "./Data/Components/Todolists/Todolists";
import {ApplicationBar} from "./Data/Components/AppBar/ApplicationBar";
import {AddItemForm} from "./Data/Components/AddItemForm/AddItemForm";
import {RootStateType, useAppDispatch} from "./Data/Redux/Store";
import {addTodolistTC} from "./Data/Redux/Reducers/TodolistReducer";
import {CircularProgress, LinearProgress} from "@mui/material";
import {ErrorSnackbar} from "./Data/Components/Snackbar/ErrorSnackbar";
import {useSelector} from "react-redux";
import {RequestStatusType} from "./Data/Redux/Reducers/AppReducer";
import {Login} from "./Data/Components/Login/Login";
import {Navigate, Route, Routes, useNavigate} from "react-router-dom";
import {isLoggedInTC} from "./Data/Redux/Reducers/AuthReducer";

function App() {

    const dispatch = useAppDispatch()
    const isLoggedIn = useSelector<RootStateType,boolean>(state => state.Auth.isLoggedIn)
    const isInitialized = useSelector<RootStateType,boolean>(state => state.Auth.isInitialized)

    useEffect(()=> {
        dispatch(isLoggedInTC())
    },[])
    const navigate = useNavigate()
    const status = useSelector<RootStateType, RequestStatusType>(state => state.App.status)
    const addItem = (title: string) => {
        dispatch(addTodolistTC(title))
    }
    useEffect(()=> {
        if(!isLoggedIn) {
            navigate('/login')
        }
    },[isLoggedIn])
    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }

    return (
        <div className={s.App__wrapper}>
            <ApplicationBar/>
            {status === 'loading' && <LinearProgress/>}
            <ErrorSnackbar/>
            <div className={s.App__AddItemForm}>
                <AddItemForm addItem={addItem}/>
            </div>
           <Container>
               <Routes>
                   <Route path='/' element={<Todolists/>}/>
                   <Route path='/login' element={<Login/>}/>
                   <Route path='*' element={<Navigate to={'404'}/>}/>
                   <Route path={'404'} element={<h1>404: PAGE NOT FOUND</h1>}/>
               </Routes>
           </Container>
        </div>
    );
}

export default App;