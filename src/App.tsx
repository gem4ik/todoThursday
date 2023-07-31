import React from 'react';
import s from './App.module.css';
import {Todolists} from "./Data/Components/Todolists/Todolists";

function App() {


  return (
    <div className={s.AppWrapper}>
    <Todolists />
    </div>
  );
}

export default App;