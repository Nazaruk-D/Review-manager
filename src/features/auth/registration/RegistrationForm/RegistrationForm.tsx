import React from 'react';
import { useFormik } from 'formik';
import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import s from '../../login/LoginForm/LoginForm.module.scss';
import { RegisterErrorType } from '../../../../types/FormikErrorTypes';
import { supabase } from '../../../../utils/supabase';

const RegistrationForm = () => {
    const formik = useFormik({
        initialValues: {
            user_name: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
        validate: (values) => {
            const errors: RegisterErrorType = {};
            if (!values.user_name) {
                errors.user_name = 'Name is required';
            } else if (values.user_name.length < 6) {
                errors.user_name = 'Name must be min 6 characters long.';
            }

            if (!values.email) {
                errors.email = 'Email is required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }

            if (!values.password) {
                errors.password = 'Password is required';
            } else if (values.password.length < 6) {
                errors.password = 'Must be 6 characters or more';
            }

            if (!values.confirmPassword) {
                errors.confirmPassword = 'Password is required';
            } else if (values.confirmPassword.length < 6) {
                errors.confirmPassword = 'Must be 6 characters or more';
            } else if (values.password !== values.confirmPassword) {
                errors.confirmPassword = 'Passwords do not match';
            }
            return errors;
        },
        onSubmit: async (values) => {
            try {
                const { data, error } = await supabase.auth.signUp({
                    email: values.email,
                    password: values.password,
                });

                if (!error && data.user?.id) {
                    await supabase.from('users').update({ user_name: values.user_name }).eq('id', data.user.id);
                    console.log(data);
                } else {
                    console.log(error);
                }
            } catch (err) {
                console.log(err);
            }
        },
    });

    return (
        <Paper elevation={3} className={s.loginFormContainer}>
            <Box className={s.loginFormBlock}>
                <Typography
                    variant="h4"
                    noWrap
                    component="h4"
                    sx={{
                        mr: 2,
                        display: 'flex',
                        fontWeight: 700,
                        color: 'inherit',
                        textDecoration: 'none',
                    }}
                >
                    Sign up
                </Typography>
                <form onSubmit={formik.handleSubmit}>
                    <TextField
                        fullWidth
                        variant="standard"
                        id="user_name"
                        label="User Name"
                        className={s.input}
                        {...formik.getFieldProps('user_name')}
                    />
                    {formik.touched.user_name && formik.errors.user_name && (
                        <div style={{ color: 'red' }}>{formik.errors.user_name}</div>
                    )}
                    <TextField
                        fullWidth
                        variant="standard"
                        id="email"
                        label="Email"
                        className={s.input}
                        {...formik.getFieldProps('email')}
                    />
                    {formik.touched.email && formik.errors.email && <div style={{ color: 'red' }}>{formik.errors.email}</div>}
                    <TextField
                        fullWidth
                        variant="standard"
                        id="password"
                        label="Password"
                        type="password"
                        className={s.input}
                        {...formik.getFieldProps('password')}
                    />
                    {formik.touched.password && formik.errors.password && (
                        <div style={{ color: 'red' }}>{formik.errors.password}</div>
                    )}
                    <TextField
                        fullWidth
                        variant="standard"
                        id="confirmPassword"
                        label="Confirm Password"
                        type="password"
                        className={s.input}
                        {...formik.getFieldProps('confirmPassword')}
                    />
                    {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                        <div style={{ color: 'red' }}>{formik.errors.confirmPassword}</div>
                    )}
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ mt: '10px' }}
                        disabled={!(formik.isValid && formik.dirty)}
                    >
                        Sign UP
                    </Button>
                </form>
            </Box>
        </Paper>
    );
};

export default RegistrationForm;
