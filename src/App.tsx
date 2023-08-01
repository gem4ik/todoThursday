import React from 'react';
import s from './App.module.css';
import Container from "@mui/material/Container";
import {Todolists} from "./Data/Components/Todolists/Todolists";
import {ApplicationBar} from "./Data/Components/AppBar/ApplicationBar";

function App() {


    return (
        <>
            <ApplicationBar/>
            <Container fixed>
                <Todolists/>
            </Container>
        </>
    );
}

export default App;