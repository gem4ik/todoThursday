import React, {useEffect} from 'react'
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useFormik} from "formik";
import {RootStateType, useAppDispatch} from "../../Redux/Store";
import {loginTC} from "../../Redux/Reducers/AuthReducer";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

export type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}

export const Login = () => {
    const isLoggedIn = useSelector<RootStateType, boolean>(state => state.Auth.isLoggedIn)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
  const formik = useFormik({
        initialValues: {
          email: '',
          password: '',
          rememberMe: false
      },
        validate: (values) => {
            const errors: FormikErrorType = {}
            if (!values.email) {
                errors.email = 'Email required'
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address'
            }
            if (!values.password) {
                errors.password = 'Password Required'
            } else if (values.password.length < 6){
                errors.password = 'at list 6 symbols'
            }
            return errors
        },
      onSubmit: values => {
          dispatch(loginTC(values))
            formik.resetForm()
        },
    })

    if (isLoggedIn) {
        navigate('/')
    }

    return <Grid container justifyContent={'center'}>
        <Grid item justifyContent={'center'}>
            <FormControl>
                <FormLabel>
                    <p>To log in get registered
                        <a href={'https://social-network.samuraijs.com/'}
                           target={'_blank'}> here
                        </a>
                    </p>
                    <p>or use common test account credentials:</p>
                    <p>Email: free@samuraijs.com</p>
                    <p>Password: free</p>
                </FormLabel>
                <form onSubmit={formik.handleSubmit}>
                <FormGroup>
                    <TextField
                        label="Email"
                        margin="normal"
                        {...formik.getFieldProps('email')}/>
                    {formik.touched.email && formik.errors.email ? <div>{formik.errors.email}</div> :null}
                    <TextField
                        {...formik.getFieldProps('password')}
                        type="password"
                        label="Password"
                        margin="normal" />
                    {formik.touched.password && formik.errors.password ? <div>{formik.errors.password}</div> :null}
                    <FormControlLabel label={'Remember me'} control={<Checkbox {...formik.getFieldProps('rememberMe')} />}/>
                    <Button type={'submit'} variant={'contained'} color={'primary'}>
                        Login
                    </Button>
                </FormGroup>
                </form>
            </FormControl>
        </Grid>
    </Grid>
}