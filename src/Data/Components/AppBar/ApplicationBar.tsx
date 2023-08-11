import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {NavLink} from "react-router-dom";
import Button from "@mui/material/Button";
import {useSelector} from "react-redux";
import {RootStateType, useAppDispatch} from "../../Redux/Store";
import {logoutTC} from "../../Redux/Reducers/AuthReducer";


export const ApplicationBar = () => {
    const dispatch = useAppDispatch()
    const logoutHandler = () => {
        dispatch(logoutTC())
    }
    const isLoggedIn = useSelector<RootStateType, boolean>(state => state.Auth.isLoggedIn)

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6">
                    Todolist
                </Typography>
                {
                    !isLoggedIn
                        ? <NavLink to={'login'}>
                            <Button color="inherit">Login</Button>
                        </NavLink>
                        : <Button color="inherit" onClick={logoutHandler}>Logout</Button>
                }
            </Toolbar>
        </AppBar>
    );
};
