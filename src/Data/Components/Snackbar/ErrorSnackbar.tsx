import React, {useState} from 'react'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert, {AlertProps} from '@mui/material/Alert'
import {RootStateType, useAppDispatch} from "../../Redux/Store";
import {useSelector} from "react-redux";
import {RequestStatusType, setErrorAC} from "../../Redux/Reducers/AppReducer";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
})

export function ErrorSnackbar() {
    const error = useSelector<RootStateType, null|string>(state => state.App.error )
    const dispatch = useAppDispatch()
    const [open, setOpen] = useState(true)

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return
        }
        setOpen(false)
        dispatch(setErrorAC(null))
    }
    return (
        <Snackbar open={error!==null} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity='error' sx={{width: '100%'}}>
                {error}
            </Alert>
        </Snackbar>
    )
}
