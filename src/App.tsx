import React, {useEffect} from 'react';
import s from './App.module.css';
import {getUserTC} from "./Data/Redux/Reducers/TodolistReducer";
import {useAppDispatch} from "./Data/Redux/Store";

function App() {
  const dispatch = useAppDispatch()

  useEffect(()=>{
    dispatch(getUserTC())
  }, [])

  return (
    <div className={s.AppWrapper}>

    </div>
  );
}

export default App;