import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Menu from "@mui/icons-material/Menu";
import Typography from '@mui/material/Typography';



export const ApplicationBar = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6">
                    Todolist
                </Typography>
            </Toolbar>
        </AppBar>
    );
};
