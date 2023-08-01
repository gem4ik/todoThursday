import React from 'react';
import {Input} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import s from './AddItemForm.module.css'

export const AddItemForm = () => {
    return (
        <div className={s.AddItemForm__wrapper}>
            <Input/>
            <AddIcon/>
        </div>
    );
};